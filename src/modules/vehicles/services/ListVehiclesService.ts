import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Vehicle from "../infra/typeorm/entities/Vehicle";
import IVehiclesRepository from "../repositories/IVehiclesRepository";

interface Request {
    user_id: string;
    page: number;
    fuel: string; 
    gear: string; 
    min_range: number; 
    max_range: number;
}

@injectable()
export default class ListVehiclesService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('VehiclesRepository')
        private vehiclesRepository: IVehiclesRepository,
    ) {}

    public async execute({ user_id, page, fuel, gear, max_range, min_range }: Request): Promise<Vehicle[]> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        const vehicles = await this.vehiclesRepository.findAll({
            page,
            fuel,
            gear,
            max_range,
            min_range,
        });

        return vehicles;
    }
}