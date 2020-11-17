import { inject, injectable } from "tsyringe";
import { isBefore, differenceInCalendarDays } from 'date-fns';

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

        if (isBefore(end_date, start_date)) {
            throw new AppError('The end date cannot be before the start date')
        }

        if (isBefore(start_date, currentDate)) {
            throw new AppError('Cannot rent a vehicle in the past');
        }

        if (differenceInCalendarDays(end_date, start_date) < 1) {
            throw new AppError('You must rent a car for at least 1 day');
        }

        if (differenceInCalendarDays(start_date, currentDate) > 90) {
            throw new AppError('Cannot rent a car for more than three months of distance');
        }

        const verifyRental = await this.rentalsRepository.findInPeriod({
            vehicle_id, start_date, end_date
        });

        if (verifyRental.length !== 0) {
            throw new AppError('There is already a rental in this period');
        }

        const rental = await this.rentalsRepository.create({
            user_id, vehicle_id, start_date, end_date
        });

        return rental;
    }
}