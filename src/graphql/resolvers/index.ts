import { vehicleResolvers } from './vehicle';

export const resolvers = {
    Query: {
        ...vehicleResolvers.Query,
    },
    Vehicle: vehicleResolvers.Vehicle,
    EngineSpec: vehicleResolvers.EngineSpec,
    FilterGroup: vehicleResolvers.FilterGroup,
    FilterValue: vehicleResolvers.FilterValue,
};
