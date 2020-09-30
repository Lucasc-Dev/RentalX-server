import { inject, injectable } from "tsyringe";

import IVehiclesRepository from "@modules/vehicles/repositories/IVehiclesRepository";
import IRentalsRepository from "../repositories/IRentalsRepository";
import AppError from "@shared/errors/AppError";
import Rental from "../infra/typeorm/entities/Rental";

interface Request {
    vehicle_id: string;
    start_date: Date;
    end_date: Date;
}

@injectable()
export default class VerifyVehicleAvailabilityService {
    constructor(
        @inject('VehiclesRepository')
        private vehiclesRepository: IVehiclesRepository,

        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
    ) {}

    public async execute({ vehicle_id, start_date, end_date }: Request): Promise<Rental[]> {
        const vehicle = await this.vehiclesRepository.findVehicle(vehicle_id);

        if (!vehicle) {
            throw new AppError('Vehicle not found');
        }

        return [];
    }
}