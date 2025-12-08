import { createClient, type RedisClientType } from 'redis';

export interface CacheConfig {
    ttl: number; // Time to live in seconds
    enabled: boolean;
    prefix: string;
}

export class GraphQLCache {
    private client: RedisClientType | null = null;
    private isConnected = false;
    private config: CacheConfig;

    constructor(config: Partial<CacheConfig> = {}) {
        this.config = {
            ttl: config.ttl || 300, // 5 minutes default
            enabled: config.enabled !== false, // enabled by default
            prefix: config.prefix || 'gql:vehicle:',
        };

        this.initialize();
    }

    private async initialize() {
        const redisUrl = import.meta.env.REDIS_URL;

        if (!redisUrl || !this.config.enabled) {
            console.log('[GraphQLCache] Redis caching disabled (no REDIS_URL or disabled in config)');
            return;
        }

        try {
            this.client = createClient({ url: redisUrl });

            this.client.on('error', (err) => {
                console.error('[GraphQLCache] Redis error:', err);
                this.isConnected = false;
            });

            this.client.on('connect', () => {
                console.log('[GraphQLCache] Redis connected');
                this.isConnected = true;
            });

            await this.client.connect();
        } catch (error) {
            console.error('[GraphQLCache] Failed to connect to Redis:', error);
            this.client = null;
            this.isConnected = false;
        }
    }

    private getCacheKey(key: string): string {
        return `${this.config.prefix}${key}`;
    }

    async get<T>(key: string): Promise<T | null> {
        if (!this.isConnected || !this.client) {
            return null;
        }

        try {
            const cacheKey = this.getCacheKey(key);
            const cached = await this.client.get(cacheKey);

            if (cached) {
                console.log(`[GraphQLCache] HIT: ${key}`);
                return JSON.parse(cached) as T;
            }

            console.log(`[GraphQLCache] MISS: ${key}`);
            return null;
        } catch (error) {
            console.error('[GraphQLCache] Get error:', error);
            return null;
        }
    }

    async set(key: string, value: any, ttl?: number): Promise<void> {
        if (!this.isConnected || !this.client) {
            return;
        }

        try {
            const cacheKey = this.getCacheKey(key);
            const cacheTTL = ttl || this.config.ttl;

            await this.client.setEx(
                cacheKey,
                cacheTTL,
                JSON.stringify(value)
            );

            console.log(`[GraphQLCache] SET: ${key} (TTL: ${cacheTTL}s)`);
        } catch (error) {
            console.error('[GraphQLCache] Set error:', error);
        }
    }

    async invalidate(pattern: string): Promise<void> {
        if (!this.isConnected || !this.client) {
            return;
        }

        try {
            const fullPattern = this.getCacheKey(pattern);
            const keys = await this.client.keys(fullPattern);

            if (keys.length > 0) {
                await this.client.del(keys);
                console.log(`[GraphQLCache] INVALIDATED: ${keys.length} keys matching ${pattern}`);
            }
        } catch (error) {
            console.error('[GraphQLCache] Invalidate error:', error);
        }
    }

    async clear(): Promise<void> {
        if (!this.isConnected || !this.client) {
            return;
        }

        try {
            const keys = await this.client.keys(`${this.config.prefix}*`);
            if (keys.length > 0) {
                await this.client.del(keys);
                console.log(`[GraphQLCache] CLEARED: ${keys.length} keys`);
            }
        } catch (error) {
            console.error('[GraphQLCache] Clear error:', error);
        }
    }

    isEnabled(): boolean {
        return this.isConnected && this.client !== null;
    }
}

// Singleton instance
let cacheInstance: GraphQLCache | null = null;

export function getGraphQLCache(): GraphQLCache {
    if (!cacheInstance) {
        cacheInstance = new GraphQLCache({
            ttl: 300, // 5 minutes
            enabled: true,
            prefix: 'gql:vehicle:',
        });
    }
    return cacheInstance;
}
