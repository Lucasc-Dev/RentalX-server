import { inject, injectable } from "tsyringe";

import Vehicle from "../infra/typeorm/entities/Vehicle";
import AppError from "@shared/errors/AppError";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IVehiclesRepository from "../repositories/IVehiclesRepository";
import IFeaturesRepository from "../repositories/IFeaturesRepository";

interface Request {
    user_id: string;
    vehicle_id: string;
    feature_id: string;
}

@injectable()
export default class AddFeatureToVehicleService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('VehiclesRepository')
        private vehiclesRepository: IVehiclesRepository,

        @inject('FeaturesRepository')
        private featuresRepository: IFeaturesRepository,
    ) {}

    public async execute({ user_id, vehicle_id, feature_id }: Request): Promise<Vehicle> {
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
        
        const feature = await this.featuresRepository.findById(feature_id);
        
        
        if (!vehicle) {
            throw new AppError('Feature not found');
        }

        const vehicleFeature = await this.vehiclesRepository.addFeatureToVehicle({ feature_id, vehicle_id });

        if (!vehicleFeature) {
            throw new AppError('Could not add this feature to this vehicle')
        }

        return vehicleFeature;
    }
}