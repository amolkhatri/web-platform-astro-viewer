
import fs from 'node:fs';
import path from 'node:path';
import type { APIRoute } from 'astro';

const DB_FILE = path.resolve('db.json');

interface Page {
  slug: string;
  title: string;
  blocks: any[];
}

interface Db {
  pages: Page[];
}

// Helper to read DB
const readDb = (): Db => {
  if (!fs.existsSync(DB_FILE)) {
    return { pages: [] };
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
};

// Helper to write DB
const writeDb = (data: Db) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

export const GET: APIRoute = async () => {
  const db = readDb();
  return new Response(JSON.stringify(db.pages), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { slug, title, blocks } = body;

  if (!slug || !blocks) {
    return new Response(JSON.stringify({ error: 'Slug and blocks are required' }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  const db = readDb();
  const existingIndex = db.pages.findIndex((p: Page) => p.slug === slug);

  const newPage: Page = { slug, title: title || slug, blocks };

  if (existingIndex >= 0) {
    db.pages[existingIndex] = newPage;
  } else {
    db.pages.push(newPage);
  }

  writeDb(db);
  
  return new Response(JSON.stringify(newPage), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
