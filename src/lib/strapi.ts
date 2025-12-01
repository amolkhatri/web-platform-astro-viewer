interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function fetchStrapi<T>(endpoint: string, params?: Record<string, string>) {
  const baseUrl = import.meta.env.STRAPI_URL || 'http://127.0.0.1:1337';
  const token = import.meta.env.STRAPI_TOKEN;

  const url = new URL(`${baseUrl}/api/${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url.toString(), { headers });
    
    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data as StrapiResponse<T>;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

export type { Article };
