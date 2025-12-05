/**
 * API endpoint to fetch the full component registry including custom components
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

export async function GET() {
  try {
    // Read custom components from db.json
    const db = readDb();
    const customComponents = db.customComponents || [];
    
    // Import the built-in component registry
    const { componentRegistry } = await import('../../utils/componentRegistry');
    
    // Merge built-in and custom components
    const fullRegistry = [
      ...componentRegistry,
      ...customComponents.map((custom: any) => ({
        type: custom.type,
        label: custom.label,
        description: custom.description,
        category: custom.category,
        icon: '🎨', // Default icon for custom components
        fields: custom.fields,
        defaultData: custom.defaultData
      }))
    ];
    
    return new Response(JSON.stringify(fullRegistry), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching component registry:', error);
    
    // Fallback to built-in components only
    const { componentRegistry } = await import('../../utils/componentRegistry');
    
    return new Response(JSON.stringify(componentRegistry), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
