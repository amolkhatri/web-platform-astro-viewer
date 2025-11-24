import type { APIRoute } from 'astro';
import { componentRegistry } from '../../utils/componentRegistry';

/**
 * GET /api/components
 * Returns the complete component registry with all component definitions,
 * schemas, and default configurations
 */
export const GET: APIRoute = async () => {
  try {
    return new Response(
      JSON.stringify({ 
        components: componentRegistry,
        version: '1.0.0',
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
        }
      }
    );
  } catch (error) {
    console.error('Error serving component registry:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to load component registry',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
};

/**
 * Handle CORS preflight
 */
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
