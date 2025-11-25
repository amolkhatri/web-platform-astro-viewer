import type { APIRoute } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import HeroSection from '../../components/HeroSection.astro';
import FeaturesGrid from '../../components/FeaturesGrid.astro';
import NewsletterSignup from '../../components/NewsletterSignup.astro';
import FallbackBlock from '../../components/FallbackBlock.astro';
import Header from '../../components/Header.astro';
import Hero from '../../components/Hero.astro';
import VehicleGrid from '../../components/VehicleGrid.astro';
import ContentSection from '../../components/ContentSection.astro';
import Footer from '../../components/Footer.astro';
import DynamicRenderer from '../../components/DynamicRenderer.astro';
import VehicleList from '../../components/VehicleList.astro';
import VehicleListSkeleton from '../../components/VehicleListSkeleton.astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!type) {
      return new Response(
        JSON.stringify({ error: 'Block type is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const container = await AstroContainer.create();
    const fs = await import('node:fs');
    const path = await import('node:path');

    const result = await renderComponent(container, type, data);
    const { html } = result;

    // Read the CSS file for the component
    let css = '';
    try {
      // Construct path to the CSS file relative to the project root or current file
      // Since we are in src/pages/api/render.ts, and components are in src/components/
      // We need to resolve the correct path. 
      // In a real deployment, this might need adjustment depending on how assets are bundled.
      // For this dev environment, we'll try to resolve relative to the current file.

      const cssFileName = `${type}.css`;
      // Assuming the process runs from the project root or we can find the file relative to this source file
      // We will try to find the file in the known location
      const cssPathComponents = path.resolve(process.cwd(), 'src/components', cssFileName)  ;


      if (fs.existsSync(cssPathComponents)) {
        console.log('CSS file found:', cssPathComponents);
        css = fs.readFileSync(cssPathComponents, 'utf-8');
      } else {
        css = "no css found";
        console.warn(`CSS file not found: ${cssPathComponents}`);
      }
    } catch (cssError) {
      console.error('Error reading CSS file:', cssError);
      // Continue without CSS if it fails
    }

    return new Response(
      JSON.stringify({ html, css }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    console.error('Render error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to render component',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Helper function to render components
async function renderComponent(container: AstroContainer, type: string, data: any): Promise<{ html: string }> {
  switch (type) {
    case 'HeroSection':
      return { html: await container.renderToString(HeroSection, { props: data }) };
    case 'FeaturesGrid':
      return { html: await container.renderToString(FeaturesGrid, { props: data }) };
    case 'NewsletterSignup':
      return { html: await container.renderToString(NewsletterSignup, { props: data }) };
    case 'Header':
      return { html: await container.renderToString(Header, { props: data }) };
    case 'Hero':
      return { html: await container.renderToString(Hero, { props: data }) };
    case 'VehicleGrid':
      return { html: await container.renderToString(VehicleGrid, { props: data }) };
    case 'ContentSection':
      return { html: await container.renderToString(ContentSection, { props: data }) };
    case 'Footer':
      return { html: await container.renderToString(Footer, { props: data }) };
    case 'DynamicRenderer':
      return { html: await container.renderToString(DynamicRenderer, { props: data }) };
    case 'VehicleList':
      return { html: await container.renderToString(VehicleList, { props: data }) };
    case 'VehicleListSkeleton':
      return { html: await container.renderToString(VehicleListSkeleton, { props: data }) };
    default:
      return { html: await container.renderToString(FallbackBlock, { props: { type } }) };
  }
}

// Handle CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};


