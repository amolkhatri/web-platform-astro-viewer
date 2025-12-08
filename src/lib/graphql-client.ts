interface GraphQLResponse<T = any> {
    data?: T;
    errors?: Array<{ message: string }>;
}

export async function graphqlQuery<T>(
    query: string,
    variables?: Record<string, any>
): Promise<T> {
    const endpoint = import.meta.env.DEV
        ? 'http://localhost:4321/api/graphql'
        : `${import.meta.env.SITE}/api/graphql`;

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
