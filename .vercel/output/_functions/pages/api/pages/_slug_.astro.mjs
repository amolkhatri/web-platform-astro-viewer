import fs from 'node:fs';
import path from 'node:path';
export { renderers } from '../../../renderers.mjs';

const DB_FILE = path.resolve("db.json");
const readDb = () => {
  if (!fs.existsSync(DB_FILE)) {
    return { pages: [] };
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
};
const GET = async ({ params }) => {
  const { slug } = params;
  const db = readDb();
  const page = db.pages.find((p) => p.slug === slug);
  if (page) {
    return new Response(JSON.stringify(page), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } else {
    return new Response(JSON.stringify({ error: "Page not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
