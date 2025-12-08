/**
 * GraphQL Filter Utilities
 * Transforms URL parameters to GraphQL VehicleFilters input and vice versa
 */

export interface GraphQLFilterParams {
    make?: string;
    model?: string[];
    category?: string;
    minYear?: number;
    maxYear?: number;
    minPrice?: number;
    maxPrice?: number;
    bodyType?: string;
    status?: string;
    fuelType?: string;
    transmission?: string;
    drivetrain?: string;
    color?: string;
}

export interface FilterCount {
    label: string;
    count: number;
    value?: string;
}

export interface FilterAggregations {
    makes: FilterCount[];
    models: FilterCount[];
    years: FilterCount[];
    statuses: FilterCount[];
    priceRanges: FilterCount[];
    bodyTypes: FilterCount[];
}

/**
 * Parse URL search params into GraphQL filter format
 */
export function parseGraphQLFilters(searchParams: URLSearchParams): GraphQLFilterParams {
    const filters: GraphQLFilterParams = {};

    // Make (single value)
    const make = searchParams.get('make');
    if (make) filters.make = make;

    // Model (multiple values)
    const model = searchParams.get('model');
    if (model) filters.model = model.split(',').filter(Boolean);

    // Category (new/used/cpo)
    const category = searchParams.get('category') || searchParams.get('status');
    if (category) {
        // Map status values to category
        const categoryMap: Record<string, string> = {
            'new': 'new',
            'used': 'used',
            'cpo': 'used',
            'certified': 'used',
            'in-stock': 'new',
            'in-transit': 'new'
        };
        filters.category = categoryMap[category.toLowerCase()] || category;
    }

    // Year (can be single or range)
    const year = searchParams.get('year');
    if (year) {
        const years = year.split(',').map(y => parseInt(y)).filter(y => !isNaN(y));
        if (years.length > 0) {
            filters.minYear = Math.min(...years);
            filters.maxYear = Math.max(...years);
        }
    }

    // Price (parse from range string like "$20k-$30k" or direct values)
    const price = searchParams.get('price');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    if (price) {
        const priceRange = parsePriceRange(price);
        if (priceRange) {
            filters.minPrice = priceRange.min;
            filters.maxPrice = priceRange.max;
        }
    } else {
        if (minPrice) filters.minPrice = parseInt(minPrice);
        if (maxPrice) filters.maxPrice = parseInt(maxPrice);
    }

    // Body Type
    const bodyType = searchParams.get('bodyType');
    if (bodyType) filters.bodyType = bodyType;

    // Status
    const status = searchParams.get('inventoryStatus');
    if (status) filters.status = status;

    // Fuel Type
    const fuelType = searchParams.get('fuelType');
    if (fuelType) filters.fuelType = fuelType;

    // Transmission
    const transmission = searchParams.get('transmission');
    if (transmission) filters.transmission = transmission;

    // Drivetrain
    const drivetrain = searchParams.get('drivetrain');
    if (drivetrain) filters.drivetrain = drivetrain;

    // Color
    const color = searchParams.get('color');
    if (color) filters.color = color;

    return filters;
}

/**
 * Parse price range string to min/max values
 * Supports formats: "$20k-$30k", "$50k+", "20000-30000"
 */
function parsePriceRange(range: string): { min: number; max: number } | null {
    const cleanRange = range.replace(/\$/g, '').replace(/\s+/g, '').toLowerCase();

    if (cleanRange.includes('+')) {
        // Handle "$50k+" format
        const min = parseFloat(cleanRange.replace('k+', '').replace('+', '')) * 1000;
        return { min, max: 999999999 };
    } else if (cleanRange.includes('-')) {
        // Handle "$20k-$30k" format
        const [minStr, maxStr] = cleanRange.split('-');
        const min = parseFloat(minStr.replace('k', '')) * (minStr.includes('k') ? 1000 : 1);
        const max = parseFloat(maxStr.replace('k', '')) * (maxStr.includes('k') ? 1000 : 1);
        return { min, max };
    }

    return null;
}

/**
 * Build URL search params from GraphQL filters
 */
export function buildFilterUrl(
    baseUrl: string,
    filters: GraphQLFilterParams,
    additionalParams?: Record<string, string>
): string {
    const url = new URL(baseUrl, window.location.origin);
    const params = new URLSearchParams();

    // Add filters to params
    if (filters.make) params.set('make', filters.make);
    if (filters.model && filters.model.length > 0) params.set('model', filters.model.join(','));
    if (filters.category) params.set('category', filters.category);

    if (filters.minYear && filters.maxYear) {
        if (filters.minYear === filters.maxYear) {
            params.set('year', filters.minYear.toString());
        } else {
            // Create array of years in range
            const years = [];
            for (let y = filters.minYear; y <= filters.maxYear; y++) {
                years.push(y);
            }
            params.set('year', years.join(','));
        }
    }

    if (filters.minPrice !== undefined) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.bodyType) params.set('bodyType', filters.bodyType);
    if (filters.status) params.set('inventoryStatus', filters.status);
    if (filters.fuelType) params.set('fuelType', filters.fuelType);
    if (filters.transmission) params.set('transmission', filters.transmission);
    if (filters.drivetrain) params.set('drivetrain', filters.drivetrain);
    if (filters.color) params.set('color', filters.color);

    // Add additional params (like page, sort, etc.)
    if (additionalParams) {
        Object.entries(additionalParams).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
    }

    url.search = params.toString();
    return url.pathname + url.search;
}

/**
 * Update a single filter value and return new filters object
 */
export function updateFilter(
    currentFilters: GraphQLFilterParams,
    filterType: 'make' | 'model' | 'category' | 'year' | 'price' | 'bodyType' | 'status',
    value: string | string[] | number | { min: number; max: number },
    action: 'set' | 'add' | 'remove' | 'toggle' = 'set'
): GraphQLFilterParams {
    const newFilters = { ...currentFilters };

    switch (filterType) {
        case 'make':
            if (action === 'set' && typeof value === 'string') {
                newFilters.make = value;
                // Clear models when make changes
                delete newFilters.model;
            }
            break;

        case 'model':
            if (Array.isArray(value)) {
                newFilters.model = value;
            } else if (typeof value === 'string') {
                const currentModels = newFilters.model || [];
                if (action === 'add' && !currentModels.includes(value)) {
                    newFilters.model = [...currentModels, value];
                } else if (action === 'remove') {
                    newFilters.model = currentModels.filter(m => m !== value);
                } else if (action === 'toggle') {
                    newFilters.model = currentModels.includes(value)
                        ? currentModels.filter(m => m !== value)
                        : [...currentModels, value];
                } else {
                    newFilters.model = [value];
                }
            }
            break;

        case 'category':
            if (action === 'set' && typeof value === 'string') {
                newFilters.category = value;
            }
            break;

        case 'year':
            if (typeof value === 'object' && 'min' in value && 'max' in value) {
                newFilters.minYear = value.min;
                newFilters.maxYear = value.max;
            } else if (typeof value === 'number') {
                newFilters.minYear = value;
                newFilters.maxYear = value;
            }
            break;

        case 'price':
            if (typeof value === 'object' && 'min' in value && 'max' in value) {
                newFilters.minPrice = value.min;
                newFilters.maxPrice = value.max;
            }
            break;

        case 'bodyType':
            if (action === 'set' && typeof value === 'string') {
                newFilters.bodyType = value;
            }
            break;

        case 'status':
            if (action === 'set' && typeof value === 'string') {
                newFilters.status = value;
            }
            break;
    }

    return newFilters;
}

/**
 * Check if any filters are active
 */
export function hasActiveFilters(filters: GraphQLFilterParams): boolean {
    return !!(
        filters.make ||
        (filters.model && filters.model.length > 0) ||
        filters.category ||
        filters.minYear ||
        filters.maxYear ||
        filters.minPrice ||
        filters.maxPrice ||
        filters.bodyType ||
        filters.status ||
        filters.fuelType ||
        filters.transmission ||
        filters.drivetrain ||
        filters.color
    );
}

/**
 * Clear all filters
 */
export function clearAllFilters(): GraphQLFilterParams {
    return {};
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
    if (price >= 1000) {
        return `$${(price / 1000).toFixed(0)}k`;
    }
    return `$${price}`;
}

/**
 * Generate price range options for filters
 */
export function getPriceRangeOptions(): FilterCount[] {
    return [
        { label: 'Under $20k', value: '0-20000', count: 0 },
        { label: '$20k - $30k', value: '20000-30000', count: 0 },
        { label: '$30k - $40k', value: '30000-40000', count: 0 },
        { label: '$40k - $50k', value: '40000-50000', count: 0 },
        { label: '$50k - $75k', value: '50000-75000', count: 0 },
        { label: '$75k+', value: '75000-999999999', count: 0 },
    ];
}

/**
 * Process aggregation data from GraphQL response
 */
export function processAggregations(
    makes: string[],
    models: string[],
    vehicleResults: any[]
): FilterAggregations {
    // Count occurrences in results
    const makeCounts = new Map<string, number>();
    const modelCounts = new Map<string, number>();
    const yearCounts = new Map<number, number>();
    const statusCounts = new Map<string, number>();
    const bodyTypeCounts = new Map<string, number>();

    vehicleResults.forEach(vehicle => {
        // Makes
        if (vehicle.make) {
            makeCounts.set(vehicle.make, (makeCounts.get(vehicle.make) || 0) + 1);
        }

        // Models
        if (vehicle.model) {
            modelCounts.set(vehicle.model, (modelCounts.get(vehicle.model) || 0) + 1);
        }

        // Years
        if (vehicle.year) {
            yearCounts.set(vehicle.year, (yearCounts.get(vehicle.year) || 0) + 1);
        }

        // Status
        if (vehicle.inventoryStatus) {
            statusCounts.set(vehicle.inventoryStatus, (statusCounts.get(vehicle.inventoryStatus) || 0) + 1);
        }

        // Body Type
        if (vehicle.bodyType) {
            bodyTypeCounts.set(vehicle.bodyType, (bodyTypeCounts.get(vehicle.bodyType) || 0) + 1);
        }
    });

    return {
        makes: makes.map(make => ({
            label: make,
            value: make,
            count: makeCounts.get(make) || 0
        })),
        models: models.map(model => ({
            label: model,
            value: model,
            count: modelCounts.get(model) || 0
        })),
        years: Array.from(yearCounts.entries())
            .map(([year, count]) => ({
                label: year.toString(),
                value: year.toString(),
                count
            }))
            .sort((a, b) => parseInt(b.label) - parseInt(a.label)),
        statuses: Array.from(statusCounts.entries())
            .map(([status, count]) => ({
                label: status,
                value: status,
                count
            })),
        priceRanges: getPriceRangeOptions(),
        bodyTypes: Array.from(bodyTypeCounts.entries())
            .map(([type, count]) => ({
                label: type,
                value: type,
                count
            }))
    };
}

/**
 * Convert server-side GraphQL filters to application aggregations format
 */
export function convertGraphQLFiltersToAggregations(filters: any[]): FilterAggregations {
    const aggregations: FilterAggregations = {
        makes: [],
        models: [],
        years: [],
        statuses: [],
        priceRanges: getPriceRangeOptions(),
        bodyTypes: []
    };

    if (!filters || !Array.isArray(filters)) return aggregations;

    filters.forEach(filterGroup => {
        const options = filterGroup.values.map((v: any) => ({
            label: v.label || v.name,
            value: v.name,
            count: v.count
        }));

        switch (filterGroup.key) {
            case 'make':
                aggregations.makes = options;
                break;
            case 'model':
                aggregations.models = options;
                break;
            case 'year':
                aggregations.years = options.sort((a: any, b: any) => parseInt(b.value || '0') - parseInt(a.value || '0'));
                break;
            case 'status':
            case 'inventoryStatus':
                aggregations.statuses = options;
                break;
            case 'bodyType':
                aggregations.bodyTypes = options;
                break;
            case 'priceRange':
                // specialized handling if needed, but for now we often reuse static ranges 
                // or we could map server ranges if they align
                break;
        }
    });

    return aggregations;
}
