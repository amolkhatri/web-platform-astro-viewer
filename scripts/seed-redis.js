import { createClient } from 'redis';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import process from 'process';

const PAGES_LIST_KEY = 'pages:all';
const DB_FILE_PATH = path.join(process.cwd(), 'db.json');

function parseArgs() {
    const args = process.argv.slice(2);
    const force = args.includes('--force');
    const redisUrlArg = args.find((arg) => arg.startsWith('--redis-url='));
    const redisUrlFromArg = redisUrlArg ? redisUrlArg.split('=').slice(1).join('=') : undefined;
    const redisUrl = redisUrlFromArg ?? process.env.REDIS_URL;

    return { force, redisUrl };
}

function normalizePages(parsed) {
    if (!parsed || !parsed.pages) {
        return [];
    }

    if (Array.isArray(parsed.pages)) {
        return parsed.pages;
    }

    return Object.values(parsed.pages);
}

async function readDbFile() {
    if (!existsSync(DB_FILE_PATH)) {
        console.warn(`No db.json found at ${DB_FILE_PATH}. Nothing to seed.`);
        return [];
    }

    const data = await readFile(DB_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    return normalizePages(parsed);
}

async function seedRedis({ redisUrl, force }) {
    if (!redisUrl) {
        throw new Error('Redis URL missing. Provide REDIS_URL env or --redis-url=');
    }

    const client = createClient({ url: redisUrl });

    client.on('error', (err) => {
        console.error('Redis Client Error', err);
    });

    await client.connect();

    try {
        const pages = await readDbFile();
        if (pages.length === 0) {
            console.info('No pages found in db.json. Nothing to seed.');
            return;
        }

        const existingCount = await client.sCard(PAGES_LIST_KEY);
        if (existingCount > 0 && !force) {
            console.info(
                `Redis already has ${existingCount} page(s). Use --force to overwrite.\nSkipping seed.`
            );
            return;
        }

        if (force && existingCount > 0) {
            const existingSlugs = await client.sMembers(PAGES_LIST_KEY);
            if (existingSlugs.length > 0) {
                const pageKeys = existingSlugs.map((slug) => `pages:${slug}`);
                await client.del(pageKeys);
                await client.del(PAGES_LIST_KEY);
                console.info(`Cleared ${existingSlugs.length} existing page(s) before seeding.`);
            }
        }

        const pipeline = client.multi();

        for (const page of pages) {
            if (!page?.slug) {
                console.warn('Skipping page without slug:', page);
                continue;
            }
            pipeline.set(`pages:${page.slug}`, JSON.stringify(page));
            pipeline.sAdd(PAGES_LIST_KEY, page.slug);
        }

        await pipeline.exec();
        console.info(`Seeded ${pages.length} page(s) into Redis.`);
    } finally {
        await client.quit();
    }
}

async function main() {
    const { force, redisUrl } = parseArgs();

    try {
        await seedRedis({ redisUrl, force });
    } catch (error) {
        console.error('Redis seed failed:', error);
        process.exitCode = 1;
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}



