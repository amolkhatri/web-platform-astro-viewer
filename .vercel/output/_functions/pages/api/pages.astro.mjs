import fs from 'node:fs';
import path from 'node:path';
export { renderers } from '../../renderers.mjs';

const DB_FILE = path.resolve("db.json");
const readDb = () => {
  if (!fs.existsSync(DB_FILE)) {
    return { pages: [] };
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
};
const writeDb = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};
const GET = async () => {
  const db = readDb();
  return new Response(JSON.stringify(db.pages), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
const POST = async ({ request }) => {
  const body = await request.json();
  const { slug, title, blocks } = body;
  if (!slug || !blocks) {
    return new Response(JSON.stringify({ error: "Slug and blocks are required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  const db = readDb();
  const existingIndex = db.pages.findIndex((p) => p.slug === slug);
  const newPage = { slug, title: title || slug, blocks };
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
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
