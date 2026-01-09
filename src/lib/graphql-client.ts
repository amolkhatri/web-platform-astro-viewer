interface GraphQLResponse<T = any> {
    data?: T;
    errors?: Array<{ message: string }>;
}

export async function graphqlQuery<T>(
    query: string,
    variables?: Record<string, any>
): Promise<T> {
    // Use relative URL for client-side, or construct full URL for SSR
    const endpoint = typeof window !== 'undefined'
        ? '/api/graphql'
        : import.meta.env.SITE
            ? `${import.meta.env.SITE}/api/graphql`
            : 'http://localhost:4321/api/graphql';

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
    }

    const result: GraphQLResponse<T> = await response.json();

    if (result.errors && result.errors.length > 0) {
        throw new Error(`GraphQL Error: ${result.errors[0].message}`);
    }

    if (!result.data) {
        throw new Error('GraphQL response did not contain data');
    }

    return result.data;
}
