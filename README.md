# Web Platform Astro Viewer

This package hosts the Astro-based viewer for the DealerOn platform. Pages are primarily served out of Redis, while `db.json` in the project root acts as a local development data source and seed file.

## 🧞 Commands

Run all commands from the project root:

| Command                         | Action                                                     |
| :------------------------------ | :--------------------------------------------------------- |
| `npm install`                   | Installs dependencies                                      |
| `npm run dev`                   | Starts the dev server at `http://localhost:4321`           |
| `npm run build`                 | Builds the site into `./dist/`                             |
| `npm run preview`               | Previews the production build                              |
| `npm run astro ...`             | For direct Astro CLI commands                              |
| `npm run seed:redis [--force]`  | Seeds Redis from `db.json` (details below)                 |

## Redis Seeding Script

Use the standalone script to migrate `db.json` content into Redis whenever you bootstrap an environment or need to restore missing page data.

```sh
# Provide the Redis connection string via env var…
REDIS_URL=redis://localhost:6379 npm run seed:redis

# …or pass it explicitly as a CLI flag.
npm run seed:redis -- --redis-url=redis://localhost:6379
```

### Options

- `--force` clears existing `pages:*` keys plus the `pages:all` set before reseeding.
- `--redis-url=` overrides the `REDIS_URL` environment variable if you prefer a CLI flag.

If Redis already stores page data and `--force` is omitted, the script exits early and leaves existing state untouched. Ensure `db.json` exists before running the migration. When the script finishes, it logs how many pages were written or why it skipped seeding.
