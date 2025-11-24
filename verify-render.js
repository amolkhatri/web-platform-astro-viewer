
import fetch from 'node-fetch';

async function testRender(type, data) {
    try {
        const response = await fetch('http://localhost:4322/api/render', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, data }),
        });

        if (!response.ok) {
            console.error(`Failed to render ${type}: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error(text);
            return;
        }

        const result = await response.json();
        console.log(`--- ${type} ---`);
        console.log('HTML length:', result.html.length);
        console.log('CSS length:', result.css.length);
        console.log('HTML preview:', result.html.substring(0, 100) + '...');

        if (result.html.includes('astro-')) {
            console.log('✅ Contains Astro scoped classes');
        } else {
            console.log('⚠️ No Astro scoped classes found (might be expected if no styles)');
        }
    } catch (error) {
        console.error(`Error testing ${type}:`, error);
    }
}

async function main() {
    await testRender('HeroSection', { title: 'Test Hero', subtitle: 'Test Subtitle' });
    await testRender('FeaturesGrid', { items: ['Feature 1', 'Feature 2'] });
    await testRender('NewsletterSignup', { ctaText: 'Sign Up Now' });
    await testRender('UnknownBlock', {});
}

main();
