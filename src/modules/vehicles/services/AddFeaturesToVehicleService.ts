import { inject, injectable } from "tsyringe";

import Vehicle from "../infra/typeorm/entities/Vehicle";
import AppError from "@shared/errors/AppError";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IVehiclesRepository from "../repositories/IVehiclesRepository";
import IFeaturesRepository from "../repositories/IFeaturesRepository";

interface Request {
    user_id: string;
    vehicle_id: string;
    features: string[];
}

@injectable()
export default class AddFeaturesToVehicleService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('VehiclesRepository')
        private vehiclesRepository: IVehiclesRepository,

        @inject('FeaturesRepository')
        private featuresRepository: IFeaturesRepository,
    ) {}

    public async execute({ user_id, vehicle_id, features }: Request): Promise<Vehicle> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        if (user.role !== 'admin') {
            throw new AppError('Only administrator users can create vehicles');
        }

        const vehicle = await this.vehiclesRepository.findById(vehicle_id);

        if (!vehicle) {
            throw new AppError('Vehicle not found');
        }
        
        const featuresQuery = await this.featuresRepository.findManyById(features);
        
        if (featuresQuery.length !== features.length) {
            throw new AppError('Feature not found');
        }

        const featuresToAdd = featuresQuery.filter(feature => {
            const containsFeature = vehicle.features.some(vehicleFeature => 
                vehicleFeature.id === feature.id
            );

            return !containsFeature && feature;
        });

        await this.vehiclesRepository.addFeaturesToVehicle({ features: featuresToAdd, vehicle });

        return vehicle;
    }
}