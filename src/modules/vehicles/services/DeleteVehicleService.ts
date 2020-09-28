import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IVehiclesRepository from "../repositories/IVehiclesRepository";

interface Request {
    user_id: string;
    vehicle_id: string;
}

@injectable()
export default class DeleteVehicleService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('VehiclesRepository')
        private vehiclesRepository: IVehiclesRepository,
    ) {}

    public async execute({ user_id, vehicle_id }: Request): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        if (user.role !== 'admin') {
            throw new AppError('Only administrator users can create vehicles');
        }

        await this.vehiclesRepository.delete(vehicle_id);

        return;
    }
}