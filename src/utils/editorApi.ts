// Editor API utilities
// Since the editor is now served from the same Astro app, we can use relative URLs

const getApiBaseUrl = (): string => {
    // When running in the same Astro app, we can use relative URLs
    if (typeof window === 'undefined') return '/api';
    
    const isLocalhost = 
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === '';

    // If we're on localhost, use the local API
    // Otherwise use relative URLs since we're served from the same domain
    return isLocalhost
        ? `${window.location.origin}/api`
        : '/api';
};

const API_BASE_URL = getApiBaseUrl();

interface Page {
    slug: string;
    title?: string;
    blocks: Block[];
    layout?: string;
}

interface Block {
    type: string;
    data: Record<string, unknown>;
    serverIsland?: boolean;
}

interface ComponentField {
    name: string;
    type: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    itemType?: string;
    addButtonText?: string;
    fields?: ComponentField[];
}

interface ComponentDefinition {
    type: string;
    label: string;
    description?: string;
    category?: string;
    icon?: string;
    fields: ComponentField[];
    defaultData: Record<string, unknown>;
}

interface Layout {
    id: string;
    label: string;
}

/**
 * Fetch component registry from the viewer API
 */
export async function fetchComponentRegistry(): Promise<ComponentDefinition[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/components`);
        if (!response.ok) {
            throw new Error('Failed to fetch component registry');
        }
        const data = await response.json();
        // API returns { components: [...], version, timestamp }
        return data.components || data;
    } catch (error) {
        console.error('Error fetching component registry:', error);
        throw error;
    }
}

/**
 * Fetch available layouts from the viewer
 */
export async function fetchLayouts(): Promise<Layout[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/layouts.json`);
        if (!response.ok) {
            throw new Error('Failed to fetch layouts');
        }
        const data = await response.json();
        return data.layouts;
    } catch (error) {
        console.error('Error fetching layouts:', error);
        throw error;
    }
}

/**
 * Fetch all pages from the backend
 */
export async function fetchPages(): Promise<Page[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/pages`);
        if (!response.ok) {
            throw new Error('Failed to fetch pages');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching pages:', error);
        throw error;
    }
}

/**
 * Fetch a specific page by slug.
 * When used by the editor, we prefer the draft version if it exists.
 */
export async function fetchPage(slug: string): Promise<Page> {
    try {
        const response = await fetch(`${API_BASE_URL}/pages/${slug}?draft=true`);
        if (!response.ok) {
            throw new Error(`Failed to fetch page: ${slug}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching page ${slug}:`, error);
        throw error;
    }
}

/**
 * Save or update a page
 */
export async function savePage(pageData: Page): Promise<Page> {
    try {
        const response = await fetch(`${API_BASE_URL}/pages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pageData),
        });

        if (!response.ok) {
            throw new Error('Failed to save page');
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving page:', error);
        throw error;
    }
}

/**
 * Save or update a draft page.
 * This is used for autosaving editor changes to a draft version.
 */
export async function saveDraftPage(pageData: Page): Promise<Page> {
    try {
        const response = await fetch(`${API_BASE_URL}/pages/draft`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pageData),
        });

        if (!response.ok) {
            throw new Error('Failed to save draft page');
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving draft page:', error);
        throw error;
    }
}

/**
 * Publish a draft page to live.
 */
export async function publishPage(slug: string): Promise<{ success: boolean }> {
    try {
        const response = await fetch(`${API_BASE_URL}/pages/publish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ slug }),
        });

        if (!response.ok) {
            throw new Error('Failed to publish page');
        }

        return await response.json();
    } catch (error) {
        console.error('Error publishing page:', error);
        throw error;
    }
}

/**
 * Fetch all custom components from the viewer
 */
export async function fetchCustomComponents(): Promise<ComponentDefinition[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/custom-components`);
        if (!response.ok) {
            throw new Error('Failed to fetch custom components');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching custom components:', error);
        throw error;
    }
}

/**
 * Save a custom component to the viewer
 */
export async function saveCustomComponent(componentData: Partial<ComponentDefinition> & { code: string }): Promise<ComponentDefinition> {
    try {
        const response = await fetch(`${API_BASE_URL}/custom-components`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(componentData),
        });

        if (!response.ok) {
            throw new Error('Failed to save custom component');
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving custom component:', error);
        throw error;
    }
}

export type { Page, Block, ComponentDefinition, ComponentField, Layout };

