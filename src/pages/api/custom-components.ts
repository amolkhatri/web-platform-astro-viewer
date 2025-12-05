/**
 * API endpoint to save custom components
 * POST /api/custom-components
 */

import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'db.json');

// Helper to read DB
const readDb = () => {
  if (!fs.existsSync(DB_FILE)) {
    return { pages: {}, drafts: {}, customComponents: [] };
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
};

// Helper to write DB
const writeDb = (data: any) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

export async function GET() {
  try {
    const db = readDb();
    const customComponents = db.customComponents || [];
    
    return new Response(JSON.stringify(customComponents), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching custom components:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch custom components' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST({ request }: { request: Request }) {
  try {
    const { type, label, description, category, code, fields, defaultData } = await request.json();
    
    if (!type || !label || !code) {
      return new Response(JSON.stringify({ error: 'Type, label, and code are required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const db = readDb();
    
    // Initialize customComponents array if it doesn't exist
    if (!db.customComponents) {
      db.customComponents = [];
    }

    // Check if component with this type already exists
    const existingIndex = db.customComponents.findIndex((c: any) => c.type === type);

    const newComponent = {
      type,
      label,
      description: description || '',
      category: category || 'content',
      code,
      fields: fields || [],
      defaultData: defaultData || {}
    };

    if (existingIndex >= 0) {
      // Update existing component
      db.customComponents[existingIndex] = newComponent;
    } else {
      // Add new component
      db.customComponents.push(newComponent);
    }

    writeDb(db);
    
    return new Response(JSON.stringify(newComponent), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error saving custom component:', error);
    return new Response(JSON.stringify({ error: 'Failed to save custom component' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
