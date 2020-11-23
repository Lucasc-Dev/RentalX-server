import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IVehicleImagesRepository from "../repositories/IVehicleImagesRepository";
import IVehiclesRepository from "../repositories/IVehiclesRepository";

import Vehicle from "../infra/typeorm/entities/Vehicle";
import AppError from "@shared/errors/AppError";

interface Request {
    user_id: string;
    vehicle_id: string;
    name: string;
    brand: string;
    model: string;
    plate: string;
    daily_price: number;
    features: string[];
    images: { image: string }[];
    fuel: 'gasoline' | 'flex' | 'eletrical';
    gear: 'manual' | 'automatic';
}

@injectable()
export default class UpdateVehicleService {
    constructor (
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('VehiclesRepository')
        private vehiclesRepository: IVehiclesRepository,

        @inject('VehicleImagesRepository')
        private vehicleImagesRepository: IVehicleImagesRepository,
    ) {}

    public async execute({ 
        user_id, vehicle_id, name, brand, model, plate, fuel, gear, daily_price, features, images
    }: Request): Promise<Vehicle> {
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

        if (vehicle.plate !== plate) {
            const findVehicleByPlate = await this.vehiclesRepository.findByPlate(plate);
    
            if (findVehicleByPlate) {
                throw new AppError('Car plate is already registered');
            }
        }

        if (daily_price < 0) {
            throw new AppError('Daily price cannot be less than 0');
        }

        if (images) {
            this.vehicleImagesRepository.delete(vehicle.images.map(image => image.id))

            const newImages = await this.vehicleImagesRepository.createMany(images);
            
            vehicle.images = newImages;
        }

        vehicle.name = name;
        vehicle.brand = brand;
        vehicle.model = model;
        vehicle.plate = plate;
        vehicle.fuel = fuel;
        vehicle.gear = gear;
        vehicle.daily_price = daily_price;

        await this.vehiclesRepository.save(vehicle);

        return vehicle;
    }
}