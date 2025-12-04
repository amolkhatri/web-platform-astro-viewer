import { createClient } from 'redis';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { getSecret } from 'astro:env/server';

export interface Page {
    slug: string;
    title: string;
    blocks: any[];
    layout?: string;
}

const PAGES_LIST_KEY = 'pages:all';
const DRAFTS_LIST_KEY = 'drafts:all';
const DB_FILE_PATH = join(process.cwd(), 'db.json');

// Initialize Redis client only if REDIS_URL is provided
let redisClient: ReturnType<typeof createClient> | null = null;

const redisUrl = (getSecret('REDIS_URL') ?? process.env.REDIS_URL)?.trim();

if (redisUrl) {
    redisClient = createClient({
        url: redisUrl
    });

    redisClient.on('error', (err) => console.error('Redis Client Error', err));

    // Connect to Redis and seed from db.json if needed
    redisClient
        .connect()
        .then(seedRedisFromFile)
        .catch((error) => {
            console.error('Failed to connect to Redis:', error);
        });
} else {
    console.info('REDIS_URL not provided; falling back to file storage.');
}

// File-based storage helpers
type FileDbFormat =
    | { pages: Record<string, Page>; drafts?: Record<string, Page> }
    | { pages: Page[]; drafts?: Page[] }
    | { pages?: undefined; drafts?: undefined };

interface NormalizedFileDb {
    pages: Record<string, Page>;
    drafts: Record<string, Page>;
}

async function readDbFile(): Promise<NormalizedFileDb> {
    try {
        if (existsSync(DB_FILE_PATH)) {
            const data = await readFile(DB_FILE_PATH, 'utf-8');
            const parsed: FileDbFormat = JSON.parse(data);

            let pages: Record<string, Page> = {};
            let drafts: Record<string, Page> = {};

            // Normalize pages
            if (Array.isArray(parsed.pages)) {
                for (const page of parsed.pages) {
                    pages[page.slug] = page;
                }
            } else if (parsed.pages && typeof parsed.pages === 'object') {
                pages = parsed.pages as Record<string, Page>;
            }

            // Normalize drafts (optional, backward compatible)
            if (Array.isArray(parsed.drafts)) {
                for (const draft of parsed.drafts) {
                    drafts[draft.slug] = draft;
                }
            } else if (parsed.drafts && typeof parsed.drafts === 'object') {
                drafts = parsed.drafts as Record<string, Page>;
            }

            return { pages, drafts };
        }
    } catch (error) {
        console.error('Error reading db.json:', error);
    }
    return { pages: {}, drafts: {} };
}

async function writeDbFile(data: NormalizedFileDb): Promise<void> {
    try {
        await writeFile(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing db.json:', error);
        throw error;
    }
}

async function seedRedisFromFile(): Promise<void> {
    if (!redisClient) {
        return;
    }

    try {
        const hasPagesSet = await redisClient.exists(PAGES_LIST_KEY);
        if (hasPagesSet) {
            const count = await redisClient.sCard(PAGES_LIST_KEY);
            if (count > 0) {
                return;
            }
        }

        const db = await readDbFile();
        const pages = Object.values(db.pages);

        if (pages.length === 0) {
            console.info('No local pages found to seed Redis.');
            return;
        }

        for (const page of pages) {
            await redisClient.set(`pages:${page.slug}`, JSON.stringify(page));
            await redisClient.sAdd(PAGES_LIST_KEY, page.slug);
        }

        // Seed drafts if present (optional)
        const drafts = Object.values(db.drafts);
        if (drafts.length > 0) {
            for (const draft of drafts) {
                await redisClient.set(`drafts:${draft.slug}`, JSON.stringify(draft));
                await redisClient.sAdd(DRAFTS_LIST_KEY, draft.slug);
            }
        }

        console.info(`Seeded ${pages.length} page(s) and ${drafts.length} draft page(s) from db.json into Redis.`);
    } catch (error) {
        console.error('Failed to seed Redis from db.json:', error);
    }
}

/**
 * Get all live pages from storage (Redis or file)
 */
export async function getPages(): Promise<Page[]> {
    if (redisClient) {
        // Use Redis
        const slugs = await redisClient.sMembers(PAGES_LIST_KEY);

        if (!slugs || slugs.length === 0) {
            return [];
        }

        const pages: Page[] = [];
        for (const slug of slugs) {
            const pageData = await redisClient.get(`pages:${slug}`);
            if (pageData) {
                pages.push(JSON.parse(pageData));
            }
        }

        return pages;
    } else {
        // Use file storage
        const db = await readDbFile();
        return Object.values(db.pages);
    }
}

/**
 * Get a single live page by slug
 */
export async function getPage(slug: string): Promise<Page | null> {
    if (redisClient) {
        // Use Redis
        const pageData = await redisClient.get(`pages:${slug}`);
        return pageData ? JSON.parse(pageData) : null;
    } else {
        // Use file storage
        const db = await readDbFile();
        return db.pages[slug] || null;
    }
}

/**
 * Get a draft page by slug (if any)
 */
export async function getDraftPage(slug: string): Promise<Page | null> {
    if (redisClient) {
        const draftData = await redisClient.get(`drafts:${slug}`);
        return draftData ? JSON.parse(draftData) : null;
    } else {
        const db = await readDbFile();
        return db.drafts[slug] || null;
    }
}

/**
 * Save a live page to storage
 */
export async function savePage(page: Page): Promise<void> {
    if (redisClient) {
        // Use Redis
        await redisClient.set(`pages:${page.slug}`, JSON.stringify(page));
        await redisClient.sAdd(PAGES_LIST_KEY, page.slug);
    } else {
        // Use file storage
        const db = await readDbFile();
        db.pages[page.slug] = page;
        await writeDbFile(db);
    }
}

/**
 * Save a draft page to storage
 */
export async function saveDraftPage(page: Page): Promise<void> {
    if (redisClient) {
        await redisClient.set(`drafts:${page.slug}`, JSON.stringify(page));
        await redisClient.sAdd(DRAFTS_LIST_KEY, page.slug);
    } else {
        const db = await readDbFile();
        db.drafts[page.slug] = page;
        await writeDbFile(db);
    }
}

/**
 * Publish a draft page by copying it to live storage and removing the draft
 */
export async function publishDraftPage(slug: string): Promise<Page | null> {
    if (redisClient) {
        const draftData = await redisClient.get(`drafts:${slug}`);
        if (!draftData) {
            return null;
        }

        const draft: Page = JSON.parse(draftData);

        // Save as live page
        await redisClient.set(`pages:${slug}`, JSON.stringify(draft));
        await redisClient.sAdd(PAGES_LIST_KEY, slug);

        // Remove draft
        await redisClient.del(`drafts:${slug}`);
        await redisClient.sRem(DRAFTS_LIST_KEY, slug);

        return draft;
    } else {
        const db = await readDbFile();
        const draft = db.drafts[slug];
        if (!draft) {
            return null;
        }

        db.pages[slug] = draft;
        delete db.drafts[slug];
        await writeDbFile(db);

        return draft;
    }
}

/**
 * Delete a live page from storage
 */
export async function deletePage(slug: string): Promise<void> {
    if (redisClient) {
        // Use Redis
        await redisClient.del(`pages:${slug}`);
        await redisClient.sRem(PAGES_LIST_KEY, slug);
    } else {
        // Use file storage
        const db = await readDbFile();
        delete db.pages[slug];
        await writeDbFile(db);
    }
}
