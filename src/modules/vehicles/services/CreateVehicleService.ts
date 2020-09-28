import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import IVehiclesRepository from "../repositories/IVehiclesRepository";
import Vehicle from "../infra/typeorm/entities/Vehicle";

interface Request {
    user_id: string;
    name: string;
    brand: string;
    model: string;
    plate: string;
    daily_price: number;
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
    ) {}

    public async execute(
        { user_id, name, brand, model, plate, daily_price, fuel, gear }: Request
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

        const vehicle = await this.vehiclesRepository.create({
            name,
            brand,
            model,
            plate,
            daily_price,
            fuel,
            gear,
        });

        return vehicle;
    }
}