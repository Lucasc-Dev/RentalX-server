import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import Vehicle from "../infra/typeorm/entities/Vehicle";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IVehiclesRepository from "../repositories/IVehiclesRepository";

interface Request {
    user_id: string;
    vehicle_id: string;
}

@injectable()
export default class ShowVehicleService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('VehiclesRepository')
        private vehiclesRepository: IVehiclesRepository,
    ) {}

    public async execute({ user_id, vehicle_id }: Request): Promise<Vehicle> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }
        
        const vehicle = await this.vehiclesRepository.findVehicle(vehicle_id);

        if (!vehicle) {
            throw new AppError('Vehicle not found');
        }

        return vehicle;
    }
}