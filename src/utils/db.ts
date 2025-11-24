import fs from 'node:fs';
import path from 'node:path';

export interface Page {
  slug: string;
  title: string;
  blocks: any[];
}

export interface DbSchema {
  pages: Page[];
}

export function readDb(): DbSchema {
  const dbPath = path.resolve(process.cwd(), 'db.json');
  if (fs.existsSync(dbPath)) {
    const fileContent = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(fileContent);
  }
  return { pages: [] };
}
