import { inject } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IVehiclesRepository from "@modules/vehicles/repositories/IVehiclesRepository";

import AppError from "@shared/errors/AppError";
import IRentalsRepository from "../repositories/IRentalsRepository";
import Rental from "../infra/typeorm/entities/Rental";

interface Request {
    user_id: string;
    vehicle_id: string;
    start_date: Date;
    end_date: Date;
}

export default class CreateRentService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        
        @inject('VehiclesRepository')
        private vehiclesRepository: IVehiclesRepository,

        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
    ) {}

    public async execute({ user_id, vehicle_id, start_date, end_date }: Request): Promise<Rental> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        const vehicle = await this.vehiclesRepository.findVehicle(vehicle_id);

        if (!vehicle) {
            throw new AppError('Vehicle not found');
        }

        const rental = await this.rentalsRepository.create({
            user_id, vehicle_id, start_date, end_date
        });

        return rental;
    }
}