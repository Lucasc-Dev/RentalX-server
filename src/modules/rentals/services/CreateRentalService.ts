import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IVehiclesRepository from "@modules/vehicles/repositories/IVehiclesRepository";
import IRentalsRepository from "../repositories/IRentalsRepository";

import AppError from "@shared/errors/AppError";
import Rental from "../infra/typeorm/entities/Rental";

interface Request {
    user_id: string;
    vehicle_id: string;
    start_date: Date;
    end_date: Date;
}

@injectable()
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

        const currentDate = new Date();

        if (start_date.getDate() <= currentDate.getDate()) {

            if (start_date.getMonth() <= currentDate.getMonth()) {
                throw new AppError('Cannot rent a vehicle in the past');
            }
        }

        if (end_date.getDate() <= start_date.getDate()) {

            if (end_date.getMonth() <= start_date.getMonth()) {
                throw new AppError('You must rent a car for at least 1 day');
            }
        }

        if (currentDate.getMonth() + 1 < end_date.getMonth()) {
            throw new AppError('Cannot rent a car for more than two months of distance');
        }

        const verifyRental = await this.rentalsRepository.findInPeriod({
            vehicle_id, start_date, end_date
        });
        if (verifyRental) {
            throw new AppError('There is already a rental in this period');
        }

        const rental = await this.rentalsRepository.create({
            user_id, vehicle_id, start_date, end_date
        });

        return rental;
    }
}