import type { VehicleAPI } from '../datasources/VehicleAPI';

interface Context {
    dataSources: {
        vehicleAPI: VehicleAPI;
    };
}

export const vehicleResolvers = {
    Query: {
        vehicle: async (_: any, { id }: { id: string }, { dataSources }: Context) => {
            return dataSources.vehicleAPI.getVehicleById(id);
        },

        vehicleByVin: async (
            _: any,
            { vin }: { vin: string },
            { dataSources }: Context
        ) => {
            return dataSources.vehicleAPI.getVehicleByVin(vin);
        },

        searchVehicles: async (
            _: any,
            { filters, sort, limit, offset }: any,
            { dataSources }: Context
        ) => {
            const apiFilters = transformFiltersForAPI(filters, sort);
            const result = await dataSources.vehicleAPI.searchVehicles(
                apiFilters,
                limit,
                offset
            );

            return {
                summary: {
                    totalCount: result.summary?.totalCount || 0,
                    count: result.summary?.count || result.results?.length || 0,
                    limit: result.summary?.limit || limit || 20,
                    offset: result.summary?.offset || offset || 0,
                },
                vehicles: result.results || [],
                filters: result.filters || [],
            };
        },

        featuredVehicles: async (
            _: any,
            { limit }: { limit: number },
            { dataSources }: Context
        ) => {
            return dataSources.vehicleAPI.getFeaturedVehicles(limit);
        },

        availableMakes: async (_: any, __: any, { dataSources }: Context) => {
            return dataSources.vehicleAPI.getAvailableMakes();
        },

        availableModels: async (
            _: any,
            { make }: { make: string },
            { dataSources }: Context
        ) => {
            return dataSources.vehicleAPI.getAvailableModels(make);
        },
    },

    Vehicle: {
        pricing: (vehicle: any) => {
            const prices = vehicle.prices || [];
            return {
                msrp: prices.find((p: any) => p.priceType === 'Msrp')?.value || null,
                salePrice:
                    prices.find((p: any) => p.priceType === 'SalePrice')?.value || null,
                featuredPrice:
                    prices.find((p: any) => p.priceType === 'FeaturedPrice')?.value || 0,
                totalDealerFeaturedPrice:
                    prices.find((p: any) => p.priceType === 'TotalDealerFeaturedPrice')
                        ?.value || null,
                savings: prices.find((p: any) => p.priceType === 'Savings')?.value || null,
                priceBreakdown: vehicle.mathbox?.cash?.priceLineItems || prices,
            };
        },

        specs: (vehicle: any) => ({
            engine: vehicle.engine || { description: '', fuelType: '', power: null },
            transmission: vehicle.transmissionDetails || {
                transmission: vehicle.transmission || '',
                transmissionType: vehicle.transmission || '',
            },
            drivetrain: vehicle.drivetrain || '',
            doors: vehicle.doors || null,
            seatingCapacity: vehicle.seatingCapacity || null,
            mpg: vehicle.mpg || null,
            horsepower: vehicle.horsepower ? parseInt(vehicle.horsepower) : null,
        }),

        colors: (vehicle: any) => ({
            exterior: vehicle.color?.exterior || {
                name: '',
                baseColor: '',
                colorCode: null,
                rgbHexValue: null,
            },
            interior: vehicle.color?.interior || {
                name: '',
                baseColor: '',
                colorCode: null,
                rgbHexValue: null,
            },
        }),

        photos: (vehicle: any) => ({
            mainPhoto: vehicle.photos?.mainPhoto || null,
            dealer: vehicle.photos?.dealer || [],
            totalPhotoCount: vehicle.mediaSummary?.totalPhotoCount || 0,
        }),

        inventoryStatus: (vehicle: any) =>
            vehicle.inventoryStatus || '',

        displayableInventoryStatus: (vehicle: any) =>
            vehicle.displayableInventoryStatus || vehicle.inventoryStatus || '',

        features: (vehicle: any) =>
            vehicle.featureOptions || [],

        incentives: (vehicle: any) =>
            vehicle.incentives || [],

        logos: (vehicle: any) =>
            vehicle.logos || [],
    },

    EngineSpec: {
        displacement: (engine: any) => {
            if (engine.displacement) return engine.displacement;
            // Try to extract from description if available
            return engine.description || '';
        },
        cylinders: (engine: any) => engine.cylinders || 0,
    },

    FilterGroup: {
        type: (filterGroup: any) => {
            // If type is already provided and not null/empty, use it
            if (filterGroup?.type && filterGroup.type.trim() !== '') {
                return filterGroup.type;
            }
            // Check if multipleSelect property exists (from API response)
            if (filterGroup?.multipleSelect !== undefined) {
                return filterGroup.multipleSelect ? 'multipleSelect' : 'singleSelect';
            }
            // Default to singleSelect for specific filter keys
            const singleSelectKeys = ['make', 'year', 'category'];
            if (filterGroup?.key && singleSelectKeys.includes(filterGroup.key)) {
                return 'singleSelect';
            }
            // Default to multipleSelect for others
            return 'multipleSelect';
        },
        values: (filterGroup: any) => {
            // Ensure values is always an array, never null
            if (Array.isArray(filterGroup?.values)) {
                // Filter out null/undefined values to prevent issues
                // The FilterValue resolvers will handle missing fields gracefully
                return filterGroup.values.filter((v: any) => v != null);
            }
            // Return empty array if values is null or undefined
            return [];
        },
    },

    FilterValue: {
        name: (filterValue: any) => {
            // Ensure name is always a non-empty string
            if (filterValue?.name && String(filterValue.name).trim() !== '') {
                return String(filterValue.name).trim();
            }
            // Fallback to label if name is missing
            if (filterValue?.label && String(filterValue.label).trim() !== '') {
                return String(filterValue.label).trim();
            }
            // Last resort: return empty string (better than null)
            return '';
        },
        label: (filterValue: any) => {
            // Ensure label is always a non-empty string
            if (filterValue?.label && String(filterValue.label).trim() !== '') {
                return String(filterValue.label).trim();
            }
            // Fallback to name if label is missing
            if (filterValue?.name && String(filterValue.name).trim() !== '') {
                return String(filterValue.name).trim();
            }
            // Last resort: return empty string (better than null)
            return '';
        },
        count: (filterValue: any) => {
            // Ensure count is always a non-null integer
            if (typeof filterValue?.count === 'number' && !isNaN(filterValue.count)) {
                return Math.max(0, Math.floor(filterValue.count));
            }
            // Default to 0 if count is missing or invalid
            return 0;
        },
        isSelected: (filterValue: any) => {
            // Ensure isSelected is always a boolean
            if (typeof filterValue?.isSelected === 'boolean') {
                return filterValue.isSelected;
            }
            // Default to false if isSelected is missing
            return false;
        },
    },
};

// Helper function to transform GraphQL filters to API format
function transformFiltersForAPI(filters: any, sort: any): Record<string, any> {
    if (!filters && !sort) return {};

    const apiFilters: any = {};

    if (filters) {
        // Category (new/used)
        if (filters.category) apiFilters.search = filters.category;

        // Make and Model
        if (filters.make) apiFilters.make = filters.make;
        if (filters.model) apiFilters.model = filters.model;

        // Year filters
        if (filters.year) apiFilters.year = filters.year;
        if (filters.minYear || filters.maxYear) {
            const years = [];
            const min = filters.minYear || 1980;
            const max = filters.maxYear || new Date().getFullYear() + 1;
            for (let y = min; y <= max; y++) {
                years.push(y);
            }
            apiFilters.year = years;
        }

        // Body type
        if (filters.bodyType) apiFilters.bodyType = filters.bodyType;

        // Price range
        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
            const min = filters.minPrice || 0;
            const max = filters.maxPrice || 9999999;
            apiFilters.priceRange = `${min}:${max}`;
        }

        // Mileage range
        if (filters.minMileage !== undefined || filters.maxMileage !== undefined) {
            const min = filters.minMileage || 0;
            const max = filters.maxMileage || 9999999;
            apiFilters.mileageRange = `${min}:${max}`;
        }

        // Other filters
        if (filters.fuelType) apiFilters.fuelType = filters.fuelType;
        if (filters.transmission) apiFilters.transmission = filters.transmission;
        if (filters.drivetrain) apiFilters.drivetrain = filters.drivetrain;
        if (filters.cylinders) apiFilters.noOfCylinders = filters.cylinders;
        if (filters.color) apiFilters.bodyColor = filters.color;
        if (filters.status) apiFilters.status = filters.status;
        if (filters.dealerLocation) apiFilters.location = filters.dealerLocation;

        // Features (multiple select)
        if (filters.features && filters.features.length > 0) {
            apiFilters.option = filters.features;
        }
    }

    // Sorting
    if (sort) {
        const direction = sort.direction === 'DESC' ? 'desc' : 'asc';
        apiFilters.sort = `${sort.field}|${direction}`;
    }

    return apiFilters;
}
