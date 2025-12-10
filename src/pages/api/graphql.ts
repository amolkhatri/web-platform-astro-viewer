import { ApolloServer } from '@apollo/server';
import type { APIRoute } from 'astro';
import { typeDefs } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers';
import { VehicleAPI } from '../../graphql/datasources/VehicleAPI';
import { getGraphQLCache } from '../../graphql/cache';

// Check if playground should be enabled
// Enable in DEV mode or if ENABLE_GRAPHQL_PLAYGROUND env var is set
const enablePlayground = 
    import.meta.env.DEV || 
    import.meta.env.PUBLIC_ENABLE_GRAPHQL_PLAYGROUND === 'true' ||
    import.meta.env.ENABLE_GRAPHQL_PLAYGROUND === 'true';

// Create Apollo Server instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: enablePlayground, // Enable introspection when playground is enabled
    includeStacktraceInErrorResponses: import.meta.env.DEV,
});

await server.start();

// Helper to create context with data sources
function createContext() {
    const cache = getGraphQLCache();

    // Check if we should use mock data
    // Priority: USE_MOCK_DATA env var > no token
    const shouldUseMock =
        import.meta.env.USE_MOCK_DATA === 'true' ||
        !import.meta.env.VEHICLE_API_TOKEN;

    const vehicleAPI = new VehicleAPI({
        baseURL: import.meta.env.VEHICLE_API_URL || '',
        webId: import.meta.env.VEHICLE_API_WEBID || '',
        bearerToken: import.meta.env.VEHICLE_API_TOKEN || '',
        useMock: shouldUseMock,
        cache,
    });

    return {
        dataSources: { vehicleAPI },
    };
}

// Handle CORS preflight
export const OPTIONS: APIRoute = async () => {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
};

// Handle GET requests (for GraphQL Playground)
export const GET: APIRoute = async (context) => {
    const query = context.url.searchParams.get('query');
    const variables = context.url.searchParams.get('variables');

    if (!query) {
        if (enablePlayground) {
            return new Response(getPlaygroundHTML(), {
                status: 200,
                headers: { 'Content-Type': 'text/html' },
            });
        }
        return new Response('GraphQL endpoint is running. Use POST to send queries.', {
            status: 200,
        });
    }

    try {
        const result = await server.executeOperation(
            {
                query,
                variables: variables ? JSON.parse(variables) : {},
            },
            {
                contextValue: createContext(),
            }
        );

        const response = result.body.kind === 'single'
            ? result.body.singleResult
            : { data: null, errors: [{ message: 'Invalid response format' }] };

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({
                errors: [{ message: error instanceof Error ? error.message : 'Unknown error' }],
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        );
    }
};

// Handle POST requests (standard GraphQL queries)
export const POST: APIRoute = async (context) => {
    try {
        const body = await context.request.json();

        const result = await server.executeOperation(body, {
            contextValue: createContext(),
        });

        const response = result.body.kind === 'single'
            ? result.body.singleResult
            : { data: null, errors: [{ message: 'Invalid response format' }] };

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({
                errors: [{ message: error instanceof Error ? error.message : 'Unknown error' }],
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        );
    }
};

// GraphQL Playground HTML
function getPlaygroundHTML() {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>GraphQL Playground</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    }
    #playground {
      height: 100vh;
      width: 100%;
    }
    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-size: 18px;
      color: #666;
    }
  </style>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/graphiql@3.0.10/graphiql.min.css" crossorigin="anonymous" />
</head>
<body>
  <div id="playground">
    <div class="loading">Loading GraphQL Playground...</div>
  </div>
  <script crossorigin="anonymous" src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js"></script>
  <script crossorigin="anonymous" src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
  <script crossorigin="anonymous" src="https://cdn.jsdelivr.net/npm/graphiql@3.0.10/graphiql.min.js"></script>
  <script>
    const fetcher = GraphiQL.createFetcher({ url: window.location.pathname });
    const root = ReactDOM.createRoot(document.getElementById('playground'));
    root.render(
      React.createElement(GraphiQL, { fetcher: fetcher })
    );
  </script>
</body>
</html>
  `;
}
