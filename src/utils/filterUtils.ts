export interface FilterParams {
  models: string[];
  years: string[];
  statuses: string[];
  priceRanges: string[];
}

export interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  vin: string;
  stock: string;
  status: string;
  price: number;
  msrp: number;
  image: string;
  exteriorColor: string;
  interiorColor: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  mpg: string;
}

export interface FilterCount {
  label: string;
  count: number;
}

/**
 * Parse URL search params into a FilterParams object
 */
export function parseFilters(searchParams: URLSearchParams): FilterParams {
  return {
    models: searchParams.get('model')?.split(',').filter(Boolean) || [],
    years: searchParams.get('year')?.split(',').filter(Boolean) || [],
    statuses: searchParams.get('status')?.split(',').filter(Boolean) || [],
    priceRanges: searchParams.get('price')?.split(',').filter(Boolean) || [],
  };
}

/**
 * Filter vehicles based on filter parameters
 * Uses OR logic within categories, AND logic across categories
 */
export function filterVehicles(vehicles: Vehicle[], filters: FilterParams): Vehicle[] {
  return vehicles.filter((vehicle) => {
    // Model filter (OR logic)
    if (filters.models.length > 0) {
      if (!filters.models.includes(vehicle.model)) {
        return false;
      }
    }

    // Year filter (OR logic)
    if (filters.years.length > 0) {
      if (!filters.years.includes(vehicle.year.toString())) {
        return false;
      }
    }

    // Status filter (OR logic)
    if (filters.statuses.length > 0) {
      // Normalize status for comparison
      const normalizedStatus = vehicle.status.toLowerCase().replace(/\s+/g, '-');
      const matchesStatus = filters.statuses.some(status => {
        const normalizedFilter = status.toLowerCase().replace(/\s+/g, '-');
        return normalizedStatus === normalizedFilter || vehicle.status === status;
      });
      if (!matchesStatus) {
        return false;
      }
    }

    // Price range filter (OR logic)
    if (filters.priceRanges.length > 0) {
      const matchesPrice = filters.priceRanges.some(range => {
        return isInPriceRange(vehicle.price, range);
      });
      if (!matchesPrice) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Check if a price falls within a price range string
 */
function isInPriceRange(price: number, range: string): boolean {
  // Handle ranges like "$20k - $30k", "$50k+"
  const cleanRange = range.replace(/\$/g, '').replace(/\s+/g, '');
  
  if (cleanRange.includes('+')) {
    // Handle "$50k+" format
    const min = parseFloat(cleanRange.replace('k+', '')) * 1000;
    return price >= min;
  } else if (cleanRange.includes('-')) {
    // Handle "$20k-$30k" format
    const [minStr, maxStr] = cleanRange.split('-');
    const min = parseFloat(minStr.replace('k', '')) * 1000;
    const max = parseFloat(maxStr.replace('k', '')) * 1000;
    return price >= min && price <= max;
  }
  
  return false;
}

/**
 * Calculate dynamic filter counts based on current filters
 * Shows how many vehicles would match if that filter option was selected
 */
export function calculateFilterCounts(
  allVehicles: Vehicle[],
  currentFilters: FilterParams
): {
  models: FilterCount[];
  years: FilterCount[];
  statuses: FilterCount[];
  priceRanges: FilterCount[];
} {
  const modelCounts = new Map<string, number>();
  const yearCounts = new Map<string, number>();
  const statusCounts = new Map<string, number>();
  const priceRangeCounts = new Map<string, number>();

  const priceRanges = ['$20k - $30k', '$30k - $40k', '$40k - $50k', '$50k+'];

  // For each vehicle, check if it would be included with each filter option
  allVehicles.forEach((vehicle) => {
    // Test model counts
    const modelTestFilters = { ...currentFilters, models: [vehicle.model] };
    if (wouldPassFilters(vehicle, modelTestFilters)) {
      modelCounts.set(vehicle.model, (modelCounts.get(vehicle.model) || 0) + 1);
    }

    // Test year counts
    const yearStr = vehicle.year.toString();
    const yearTestFilters = { ...currentFilters, years: [yearStr] };
    if (wouldPassFilters(vehicle, yearTestFilters)) {
      yearCounts.set(yearStr, (yearCounts.get(yearStr) || 0) + 1);
    }

    // Test status counts
    const statusTestFilters = { ...currentFilters, statuses: [vehicle.status] };
    if (wouldPassFilters(vehicle, statusTestFilters)) {
      statusCounts.set(vehicle.status, (statusCounts.get(vehicle.status) || 0) + 1);
    }

    // Test price range counts
    priceRanges.forEach((range) => {
      if (isInPriceRange(vehicle.price, range)) {
        const priceTestFilters = { ...currentFilters, priceRanges: [range] };
        if (wouldPassFilters(vehicle, priceTestFilters)) {
          priceRangeCounts.set(range, (priceRangeCounts.get(range) || 0) + 1);
        }
      }
    });
  });

  return {
    models: Array.from(modelCounts.entries()).map(([label, count]) => ({ label, count })),
    years: Array.from(yearCounts.entries()).map(([label, count]) => ({ label, count })),
    statuses: Array.from(statusCounts.entries()).map(([label, count]) => ({ label, count })),
    priceRanges: priceRanges.map((label) => ({ label, count: priceRangeCounts.get(label) || 0 })),
  };
}

/**
 * Check if a vehicle would pass the given filters
 * Helper function for calculating dynamic counts
 */
function wouldPassFilters(vehicle: Vehicle, filters: FilterParams): boolean {
  // Check all other filters except the one being tested
  const testVehicles = filterVehicles([vehicle], filters);
  return testVehicles.length > 0;
}

/**
 * Build a URL with updated filter parameters
 */
export function buildFilterUrl(
  baseUrl: string,
  currentFilters: FilterParams,
  filterType: 'model' | 'year' | 'status' | 'price',
  value: string,
  checked: boolean
): string {
  const url = new URL(baseUrl);
  const params = new URLSearchParams(url.search);

  // Get current values for this filter type
  let currentValues: string[] = [];
  switch (filterType) {
    case 'model':
      currentValues = currentFilters.models;
      break;
    case 'year':
      currentValues = currentFilters.years;
      break;
    case 'status':
      currentValues = currentFilters.statuses;
      break;
    case 'price':
      currentValues = currentFilters.priceRanges;
      break;
  }

  // Add or remove the value
  let newValues: string[];
  if (checked) {
    newValues = [...currentValues, value];
  } else {
    newValues = currentValues.filter((v) => v !== value);
  }

  // Update URL params
  if (newValues.length > 0) {
    params.set(filterType, newValues.join(','));
  } else {
    params.delete(filterType);
  }

  url.search = params.toString();
  return url.pathname + url.search;
}

/**
 * Check if a filter option is currently active
 */
export function isFilterActive(
  filters: FilterParams,
  filterType: 'model' | 'year' | 'status' | 'price',
  value: string
): boolean {
  switch (filterType) {
    case 'model':
      return filters.models.includes(value);
    case 'year':
      return filters.years.includes(value);
    case 'status':
      return filters.statuses.includes(value);
    case 'price':
      return filters.priceRanges.includes(value);
    default:
      return false;
  }
}
