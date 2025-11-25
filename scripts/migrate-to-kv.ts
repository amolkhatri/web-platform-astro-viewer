import { savePage } from '../src/lib/db';
import fs from 'node:fs';
import path from 'node:path';

interface Page {
    slug: string;
    title: string;
    blocks: any[];
}

interface Db {
    pages: Page[];
}

async function migrate() {
    const dbFile = path.resolve('db.json');

    if (!fs.existsSync(dbFile)) {
        console.log('No db.json file found. Nothing to migrate.');
        return;
    }

    console.log('Reading db.json...');
    const data: Db = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));

    console.log(`Found ${data.pages.length} pages to migrate.`);

    for (const page of data.pages) {
        console.log(`Migrating page: ${page.slug}`);
        await savePage(page);
    }

    console.log('Migration complete!');
    console.log('\nYou can now safely delete or archive db.json');
}

migrate().catch(console.error);
