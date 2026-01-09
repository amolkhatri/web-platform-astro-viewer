/**
 * Reusable GraphQL query fragments and queries for vehicle search
 */

// Fragment for vehicle card data
export const VEHICLE_CARD_FRAGMENT = `
  fragment VehicleCardData on Vehicle {
    id
    vin
    stockNumber
    year
    make
    model
    trim
    bodyStyle
    bodyType
    category
    pricing {
      featuredPrice
      msrp
      salePrice
      savings
    }
    photos {
      mainPhoto {
        path
        title
      }
      dealer {
        path
        title
      }
      totalPhotoCount
    }
    colors {
      exterior {
        name
        baseColor
      }
      interior {
        name
        baseColor
      }
    }
    specs {
      engine {
        description
        fuelType
      }
      transmission {
        transmission
      }
      drivetrain
    }
    inventoryStatus
    displayableInventoryStatus
  }
`;

// Fragment for filter data
export const FILTER_FRAGMENT = `
  fragment FilterData on FilterGroup {
    key
    label
    type
    values {
      name
      label
      count
      isSelected
    }
  }
`;

// Full vehicle search query with filters
export const SEARCH_VEHICLES_QUERY = `
  ${VEHICLE_CARD_FRAGMENT}
  ${FILTER_FRAGMENT}
  
  query SearchVehicles(
    $filters: VehicleFilters
    $sort: SortOptions
    $limit: Int
    $offset: Int
  ) {
    searchVehicles(
      filters: $filters
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      summary {
        totalCount
        count
        offset
        limit
      }
      vehicles {
        ...VehicleCardData
      }
      filters {
        ...FilterData
      }
    }
  }
`;

// Query for filter aggregations
export const GET_FILTER_AGGREGATIONS_QUERY = `
  query GetFilterAggregations($make: String) {
    availableMakes
    availableModels(make: $make)
  }
`;

// Combined search with aggregations
export const SEARCH_WITH_AGGREGATIONS_QUERY = `
  ${VEHICLE_CARD_FRAGMENT}
  ${FILTER_FRAGMENT}
  
  query SearchWithAggregations(
    $filters: VehicleFilters
    $sort: SortOptions
    $limit: Int
    $offset: Int
  ) {
    searchVehicles(
      filters: $filters
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      summary {
        totalCount
        count
        offset
        limit
      }
      vehicles {
        ...VehicleCardData
      }
      filters {
        ...FilterData
      }
    }
    availableMakes
  }
`;

// Query for just aggregations and summary (no vehicles) - useful for deferred loading
export const SEARCH_AGGREGATIONS_ONLY_QUERY = `
  ${FILTER_FRAGMENT}
  
  query SearchAggregationsOnly(
    $filters: VehicleFilters
    $sort: SortOptions
    $limit: Int
    $offset: Int
  ) {
    searchVehicles(
      filters: $filters
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      summary {
        totalCount
        count
        offset
        limit
      }
      filters {
        ...FilterData
      }
    }
  }
`;

// Featured vehicles query
export const FEATURED_VEHICLES_QUERY = `
  ${VEHICLE_CARD_FRAGMENT}
  
  query FeaturedVehicles($limit: Int) {
    featuredVehicles(limit: $limit) {
      ...VehicleCardData
    }
  }
`;

// Single vehicle by ID
export const GET_VEHICLE_BY_ID_QUERY = `
  ${VEHICLE_CARD_FRAGMENT}
  
  query GetVehicleById($id: ID!) {
    vehicle(id: $id) {
      ...VehicleCardData
      description
      features {
        name
        category
      }
      incentives {
        title
        description
        amount
      }
      dealerInfo {
        name
        address
        city
        state
        zip
        phone
      }
    }
  }
`;

// Single vehicle by VIN
export const GET_VEHICLE_BY_VIN_QUERY = `
  ${VEHICLE_CARD_FRAGMENT}
  
  query GetVehicleByVin($vin: String!) {
    vehicleByVin(vin: $vin) {
      ...VehicleCardData
      description
      features {
        name
        category
      }
      incentives {
        title
        description
        amount
      }
      dealerInfo {
        name
        address
        city
        state
        zip
        phone
      }
    }
  }
`;

/**
 * Helper to build GraphQL variables from filter params
 */
export function buildSearchVariables(
  filters: any,
  options: {
    limit?: number;
    offset?: number;
    sortField?: string;
    sortDirection?: 'ASC' | 'DESC';
  } = {}
) {
  const variables: any = {
    limit: options.limit || 20,
    offset: options.offset || 0,
  };

  if (filters && Object.keys(filters).length > 0) {
    variables.filters = filters;
  }

  if (options.sortField) {
    variables.sort = {
      field: options.sortField,
      direction: options.sortDirection || 'ASC',
    };
  }

  return variables;
}
