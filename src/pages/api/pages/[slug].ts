
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

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  const db = readDb();
  const page = db.pages.find((p: Page) => p.slug === slug);

  if (page) {
    return new Response(JSON.stringify(page), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } else {
    return new Response(JSON.stringify({ error: 'Page not found' }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}

// Handle CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
