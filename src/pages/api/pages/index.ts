
import type { APIRoute } from 'astro';
import { getPages, savePage, type Page } from '../../../lib/db';

export const GET: APIRoute = async () => {
  try {
    const pages = await getPages();
    return new Response(JSON.stringify(pages), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch pages' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { slug, title, blocks } = body;

    if (!slug || !blocks) {
      return new Response(JSON.stringify({ error: 'Slug and blocks are required' }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    const newPage: Page = { slug, title: title || slug, blocks };
    await savePage(newPage);

    return new Response(JSON.stringify(newPage), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error('Error saving page:', error);
    return new Response(JSON.stringify({ error: 'Failed to save page' }), {
      status: 500,
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
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
