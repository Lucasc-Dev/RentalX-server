import { inject, injectable } from "tsyringe";

import uploadConfig from '@config/upload';

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import IVehiclesRepository from "../repositories/IVehiclesRepository";

import AppError from "@shared/errors/AppError";
import Vehicle from "../infra/typeorm/entities/Vehicle";

interface Request {
    user_id: string;
    vehicle_id: string;
    filename: string;
}

@injectable()
export default class UpdateVehicleImageService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('VehiclesRepository')
        private vehiclesRepository: IVehiclesRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, vehicle_id, filename }: Request): Promise<Vehicle> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        if (user.role !== 'admin') {
            throw new AppError('Only administrator users can update vehicles image');
        }

        const vehicle = await this.vehiclesRepository.findById(vehicle_id);

        if (!vehicle) {
            throw new AppError('Vehicle not found');
        }

        if (vehicle.image) {
            const image = vehicle.image.split('/files/');

            await this.storageProvider.deleteFile(image[image.length - 1]);
        }

        await this.storageProvider.saveFile(filename);

        vehicle.image = `${uploadConfig.link}${filename}`;

        await this.vehiclesRepository.save(vehicle); 

        return vehicle;
    }
}