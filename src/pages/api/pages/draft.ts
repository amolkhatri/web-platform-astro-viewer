import type { APIRoute } from 'astro';
import { saveDraftPage, type Page } from '../../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { slug, title, blocks, layout } = body;

    if (!slug || !blocks) {
      return new Response(JSON.stringify({ error: 'Slug and blocks are required' }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    const draftPage: Page = {
      slug,
      title: title || slug,
      blocks,
      layout,
    };

    await saveDraftPage(draftPage);

    return new Response(JSON.stringify(draftPage), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error('Error saving draft page:', error);
    return new Response(JSON.stringify({ error: 'Failed to save draft page' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};

// Handle CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
    },
  });
};


