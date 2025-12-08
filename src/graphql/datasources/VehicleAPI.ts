import { mockVehicleData } from './mockData';
import type { GraphQLCache } from '../cache';

export interface VehicleAPIConfig {
    baseURL: string;
    webId: string;
    bearerToken: string;
    timeout?: number;
    useMock?: boolean;
    cache?: GraphQLCache;
}

export class MockVehicleAPI {
    async searchVehicles(filters?: any, limit = 20, offset = 0): Promise<any> {
        console.log('[MockVehicleAPI] Searching vehicles with filters:', filters);

        let results = [...mockVehicleData.results];

        if (filters) {
            if (filters.make) {
                results = results.filter(v =>
                    v.make.toLowerCase() === filters.make.toLowerCase()
                );
            }
            if (filters.model) {
                results = results.filter(v =>
                    v.model.toLowerCase().includes(filters.model.toLowerCase())
                );
            }
            if (filters.category) {
                results = results.filter(v => v.category === filters.category);
            }
            if (filters.id) {
                results = results.filter(v => v.id === filters.id);
            }
            if (filters.vin) {
                results = results.filter(v => v.vin === filters.vin);
            }
        }

        const paginatedResults = results.slice(offset, offset + limit);

        return {
            ...mockVehicleData,
            summary: {
                ...mockVehicleData.summary,
                count: paginatedResults.length,
                limit,
                offset,
                totalCount: results.length,
            },
            results: paginatedResults,
        };
    }

    async getVehicleById(id: string): Promise<any> {
        const result = await this.searchVehicles({ id }, 1, 0);
        return result.results?.[0] || null;
    }

    async getVehicleByVin(vin: string): Promise<any> {
        const result = await this.searchVehicles({ vin }, 1, 0);
        return result.results?.[0] || null;
    }

    async getFeaturedVehicles(limit = 10): Promise<any> {
        const result = await this.searchVehicles({}, limit, 0);
        return result.results || [];
    }

    async getAvailableMakes(): Promise<string[]> {
        const makeFilter = mockVehicleData.filters?.find(f => f.key === 'make');
        return makeFilter?.values.map(v => v.name) || [];
    }

    async getAvailableModels(make: string): Promise<string[]> {
        const modelFilter = mockVehicleData.filters?.find(f => f.key === 'model');
        return modelFilter?.values.map(v => v.name) || [];
    }
}

export class VehicleAPI {
    private baseURL: string;
    private webId: string;
    private bearerToken: string;
    private timeout: number;
    private useMock: boolean;
    private mockAPI: MockVehicleAPI;
    private cache?: GraphQLCache;

    constructor(config: VehicleAPIConfig) {
        this.baseURL = config.baseURL;
        this.webId = config.webId;
        this.bearerToken = config.bearerToken;
        this.timeout = config.timeout || 30000;
        this.useMock = config.useMock || !config.bearerToken;
        this.mockAPI = new MockVehicleAPI();
        this.cache = config.cache;

        if (this.useMock) {
            console.log('[VehicleAPI] Using MOCK data source');
        } else {
            console.log('[VehicleAPI] Using REAL API with bearer token');
        }

        if (this.cache?.isEnabled()) {
            console.log('[VehicleAPI] Redis caching ENABLED');
        }
    }

    private async fetch<T>(params?: Record<string, any>): Promise<T> {
        const url = new URL(this.baseURL);
        url.searchParams.append('webId', this.webId);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        value.forEach(v => url.searchParams.append(key, String(v)));
                    } else {
                        url.searchParams.append(key, String(value));
                    }
                }
            });
        }

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.bearerToken}`,
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(url.toString(), {
                headers,
                signal: controller.signal,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `Vehicle API Error: ${response.status} ${response.statusText} - ${errorText}`
                );
            }

            return await response.json();
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    throw new Error(`Vehicle API request timed out after ${this.timeout}ms`);
                }
                throw error;
            }
            throw new Error('Unknown error occurred while fetching vehicle data');
        } finally {
            clearTimeout(timeoutId);
        }
    }

    async searchVehicles(filters?: any, limit = 20, offset = 0): Promise<any> {
        if (this.useMock) {
            return this.mockAPI.searchVehicles(filters, limit, offset);
        }

        // Try cache first (with webId for multi-tenancy)
        if (this.cache?.isEnabled()) {
            const cacheKey = `${this.webId}:search:${JSON.stringify({ filters, limit, offset })}`;
            const cached = await this.cache.get(cacheKey);
            if (cached) return cached;

            const params: Record<string, any> = { limit, offset, ...filters };
            const result = await this.fetch(params);
            await this.cache.set(cacheKey, result, 300); // 5 min
            return result;
        }

        const params: Record<string, any> = { limit, offset, ...filters };
        return this.fetch(params);
    }

    async getVehicleById(id: string): Promise<any> {
        if (this.useMock) {
            return this.mockAPI.getVehicleById(id);
        }

        // Try cache first (with webId)
        if (this.cache?.isEnabled()) {
            const cacheKey = `${this.webId}:vehicle:id:${id}`;
            const cached = await this.cache.get(cacheKey);
            if (cached) return cached;

            const result = await this.searchVehicles({ id }, 1, 0);
            const vehicle = result.results?.[0] || null;
            if (vehicle) {
                await this.cache.set(cacheKey, vehicle, 600); // 10 min
            }
            return vehicle;
        }

        const result = await this.searchVehicles({ id }, 1, 0);
        return result.results?.[0] || null;
    }

    async getVehicleByVin(vin: string): Promise<any> {
        if (this.useMock) {
            return this.mockAPI.getVehicleByVin(vin);
        }

        // Try cache first (with webId)
        if (this.cache?.isEnabled()) {
            const cacheKey = `${this.webId}:vehicle:vin:${vin}`;
            const cached = await this.cache.get(cacheKey);
            if (cached) return cached;

            const result = await this.searchVehicles({ vin }, 1, 0);
            const vehicle = result.results?.[0] || null;
            if (vehicle) {
                await this.cache.set(cacheKey, vehicle, 600); // 10 min
            }
            return vehicle;
        }

        const result = await this.searchVehicles({ vin }, 1, 0);
        return result.results?.[0] || null;
    }

    async getFeaturedVehicles(limit = 10): Promise<any> {
        if (this.useMock) {
            return this.mockAPI.getFeaturedVehicles(limit);
        }

        // Try cache first (with webId)
        if (this.cache?.isEnabled()) {
            const cacheKey = `${this.webId}:featured:${limit}`;
            const cached = await this.cache.get(cacheKey);
            if (cached) return cached;

            const result = await this.searchVehicles({ promotions: 'true' }, limit, 0);
            const vehicles = result.results || [];
            await this.cache.set(cacheKey, vehicles, 120); // 2 min
            return vehicles;
        }

        const result = await this.searchVehicles({ promotions: 'true' }, limit, 0);
        return result.results || [];
    }

    async getAvailableMakes(): Promise<string[]> {
        if (this.useMock) {
            return this.mockAPI.getAvailableMakes();
        }

        // Try cache first (with webId)
        if (this.cache?.isEnabled()) {
            const cacheKey = `${this.webId}:makes:all`;
            const cached = await this.cache.get<string[]>(cacheKey);
            if (cached) return cached;

            const result = await this.searchVehicles({}, 1, 0);
            const makeFilter = result.filters?.find((f: any) => f.key === 'make');
            const makes = makeFilter?.values.map((v: any) => v.name) || [];
            await this.cache.set(cacheKey, makes, 1800); // 30 min
            return makes;
        }

        const result = await this.searchVehicles({}, 1, 0);
        const makeFilter = result.filters?.find((f: any) => f.key === 'make');
        return makeFilter?.values.map((v: any) => v.name) || [];
    }

    async getAvailableModels(make: string): Promise<string[]> {
        if (this.useMock) {
            return this.mockAPI.getAvailableModels(make);
        }

        // Try cache first (with webId)
        if (this.cache?.isEnabled()) {
            const cacheKey = `${this.webId}:models:${make}`;
            const cached = await this.cache.get<string[]>(cacheKey);
            if (cached) return cached;

            const result = await this.searchVehicles({ make }, 1, 0);
            const modelFilter = result.filters?.find((f: any) => f.key === 'model');
            const models = modelFilter?.values.map((v: any) => v.name) || [];
            await this.cache.set(cacheKey, models, 1800); // 30 min
            return models;
        }

        const result = await this.searchVehicles({ make }, 1, 0);
        const modelFilter = result.filters?.find((f: any) => f.key === 'model');
        return modelFilter?.values.map((v: any) => v.name) || [];
    }
}
