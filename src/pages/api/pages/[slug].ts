
import type { APIRoute } from 'astro';
import { getPage, getDraftPage } from '../../../lib/db';

export const GET: APIRoute = async ({ params, request }) => {
  const { slug } = params;

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  const url = new URL(request.url);
  const draftFlag = url.searchParams.get('draft') === 'true';

  try {
    let page = null;

    if (draftFlag) {
      // Prefer draft version, fall back to live if no draft exists
      page = (await getDraftPage(slug as string)) ?? (await getPage(slug as string));
    } else {
      page = await getPage(slug as string);
    }

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
  } catch (error) {
    console.error('Error fetching page:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch page' }), {
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
