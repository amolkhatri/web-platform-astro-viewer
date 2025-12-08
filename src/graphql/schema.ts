export const typeDefs = `#graphql
  # Vehicle Types
  type Vehicle {
    id: ID!
    vin: String!
    stockNumber: String!
    year: Int!
    make: String!
    model: String!
    trim: String
    bodyStyle: String
    bodyType: String
    category: String!
    
    # Pricing
    pricing: VehiclePricing!
    
    # Technical Details
    specs: VehicleSpecs!
    
    # Media
    photos: VehiclePhotos!
    thumbnailPhotoURL: String
    
    # Colors
    colors: VehicleColors!
    
    # Location & Status
    dealerInfo: DealerInfo!
    inventoryStatus: String!
    displayableInventoryStatus: String
    lotAge: Int
    
    # Additional Info
    description: String
    incentives: [Incentive!]!
    features: [Feature!]!
    logos: [Logo!]!
  }

  type VehiclePricing {
    msrp: Float
    salePrice: Float
    featuredPrice: Float!
    totalDealerFeaturedPrice: Float
    savings: Float
    priceBreakdown: [PriceLineItem!]!
  }

  type PriceLineItem {
    type: String!
    label: String!
    value: Float!
    displayValue: String!
    featured: Boolean!
  }

  type VehicleSpecs {
    engine: EngineSpec!
    transmission: TransmissionDetails!
    drivetrain: String!
    doors: Int
    seatingCapacity: Int
    mpg: String
    horsepower: Int
  }

  type EngineSpec {
    description: String!
    cylinders: Int
    fuelType: String!
    displacement: String
    power: PowerInfo
  }

  type PowerInfo {
    value: Int!
    unit: String!
  }

  type TransmissionDetails {
    transmission: String!
    transmissionType: String!
  }

  type VehicleColors {
    exterior: Color!
    interior: Color!
  }

  type Color {
    name: String
    baseColor: String
    colorCode: String
    rgbHexValue: String
  }

  type VehiclePhotos {
    mainPhoto: Photo
    dealer: [Photo!]!
    totalPhotoCount: Int!
  }

  type Photo {
    path: String
    title: String
    category: String
  }

  type DealerInfo {
    locationName: String!
    dealerCode: String!
    address: Address!
    phone: String!
    coordinates: Coordinates
  }

  type Address {
    street1: String!
    city: String!
    state: String!
    postalCode: String!
  }

  type Coordinates {
    lat: Float!
    lon: Float!
  }

  type Incentive {
    id: ID!
    description: String!
    label: String!
    type: String!
    value: Float!
    displayValue: String!
    disclaimer: String
    category: String!
    owner: String!
  }

  type Feature {
    key: String!
    value: String!
  }

  type Logo {
    name: String!
    displayImageUrl: String!
    targetURL: String
    title: String
  }

  # Search Results
  type VehicleSearchResult {
    summary: SearchSummary!
    vehicles: [Vehicle!]!
    filters: [FilterGroup!]!
  }

  type SearchSummary {
    totalCount: Int!
    count: Int!
    limit: Int!
    offset: Int!
  }

  type FilterGroup {
    key: String!
    label: String!
    type: String!
    values: [FilterValue!]!
  }

  type FilterValue {
    name: String!
    label: String!
    count: Int!
    isSelected: Boolean!
  }

  # Query Inputs
  input VehicleFilters {
    make: String
    model: String
    year: Int
    minYear: Int
    maxYear: Int
    category: String
    bodyType: String
    minPrice: Float
    maxPrice: Float
    minMileage: Int
    maxMileage: Int
    fuelType: String
    transmission: String
    drivetrain: String
    cylinders: Int
    color: String
    status: String
    dealerLocation: String
    features: [String!]
  }

  input SortOptions {
    field: String!
    direction: SortDirection!
  }

  enum SortDirection {
    ASC
    DESC
  }

  # Queries
  type Query {
    # Get single vehicle by ID
    vehicle(id: ID!): Vehicle
    
    # Get single vehicle by VIN
    vehicleByVin(vin: String!): Vehicle
    
    # Search vehicles with filters
    searchVehicles(
      filters: VehicleFilters
      sort: SortOptions
      limit: Int = 20
      offset: Int = 0
    ): VehicleSearchResult!
    
    # Get featured vehicles
    featuredVehicles(limit: Int = 10): [Vehicle!]!
    
    # Get available makes
    availableMakes: [String!]!
    
    # Get available models for a make
    availableModels(make: String!): [String!]!
  }
`;
