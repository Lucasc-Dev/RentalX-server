import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import IVehiclesRepository from "../repositories/IVehiclesRepository";
import Vehicle from "../infra/typeorm/entities/Vehicle";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import IFeaturesRepository from "../repositories/IFeaturesRepository";

interface Request {
    user_id: string;
    name: string;
    brand: string;
    model: string;
    plate: string;
    daily_price: number;
    features: string[];
    images: {
        image: string;
    }[];
    fuel: 'gasoline' | 'flex' | 'eletrical';
    gear: 'manual' | 'automatic';
}

@injectable()
export default class CreateVehicleService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('VehiclesRepository')
        private vehiclesRepository: IVehiclesRepository,

        @inject('FeaturesRepository')
        private featuresRepository: IFeaturesRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute(
        { user_id, name, brand, model, plate, daily_price, fuel, gear, images, features }: Request
    ): Promise<Vehicle> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        if (user.role !== 'admin') {
            throw new AppError('Only administrator users can create vehicles');
        }

        const findVehicleByPlate = await this.vehiclesRepository.findByPlate(plate);

        if (findVehicleByPlate) {
            throw new AppError('Car plate is already registered');
        }
        
        if (daily_price < 0) {
            throw new AppError('Daily price cannot be less than 0');
        }
        
        if (images.length > 7) {
            throw new AppError('You cannot upload more than 7 images');
        }

        let featuresQuery;

        if (features) {
            featuresQuery = await this.featuresRepository.findManyById(features);
        }

        await this.storageProvider.saveFiles(images.map(image => image.image));

        const vehicle = await this.vehiclesRepository.create({
            name,
            brand,
            model,
            plate,
            daily_price,
            fuel,
            gear,
            images,
            features: featuresQuery,
        });

        return vehicle;
    }
}