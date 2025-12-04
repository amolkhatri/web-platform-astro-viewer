
import { layoutRegistry } from '../../utils/layoutRegistry';

export async function GET() {
  return new Response(
    JSON.stringify({
      layouts: layoutRegistry,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
