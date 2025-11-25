import { createClient } from 'redis';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { getSecret } from 'astro:env/server';

export interface Page {
    slug: string;
    title: string;
    blocks: any[];
}

const PAGES_LIST_KEY = 'pages:all';
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
    | { pages: Record<string, Page> }
    | { pages: Page[] }
    | { pages?: undefined };

async function readDbFile(): Promise<{ pages: Record<string, Page> }> {
    try {
        if (existsSync(DB_FILE_PATH)) {
            const data = await readFile(DB_FILE_PATH, 'utf-8');
            const parsed: FileDbFormat = JSON.parse(data);

            if (Array.isArray(parsed.pages)) {
                const record: Record<string, Page> = {};
                for (const page of parsed.pages) {
                    record[page.slug] = page;
                }
                return { pages: record };
            }

            if (parsed.pages && typeof parsed.pages === 'object') {
                return parsed as { pages: Record<string, Page> };
            }
        }
    } catch (error) {
        console.error('Error reading db.json:', error);
    }
    return { pages: {} };
}

async function writeDbFile(data: { pages: Record<string, Page> }): Promise<void> {
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

        console.info(`Seeded ${pages.length} page(s) from db.json into Redis.`);
    } catch (error) {
        console.error('Failed to seed Redis from db.json:', error);
    }
}

/**
 * Get all pages from storage (Redis or file)
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
 * Get a single page by slug
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
 * Save a page to storage
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
 * Delete a page from storage
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
