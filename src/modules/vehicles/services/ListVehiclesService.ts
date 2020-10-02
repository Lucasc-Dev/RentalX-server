import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";
import Vehicle from "../infra/typeorm/entities/Vehicle";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IVehiclesRepository from "../repositories/IVehiclesRepository";

interface Request {
    user_id: string;
    page?: number;
    fuel?: 'gasoline' | 'flex' | 'eletrical'; 
    gear?: 'manual' | 'automatic';
    orderBy?: 'relevance' | 'lowest' | 'highest';
    start_date: Date;
    end_date: Date;
    min_range?: number; 
    max_range?: number;
}

@injectable()
export default class ListVehiclesService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('VehiclesRepository')
        private vehiclesRepository: IVehiclesRepository,
    ) {}

    public async execute({ 
        user_id, page, fuel, gear, orderBy, start_date, end_date, max_range, min_range 
    }: Request): Promise<Vehicle[]> {
        const user = await this.usersRepository.findById(user_id);

        if (!user)
            throw new AppError('User not found');
        
        if (!page)
            page = 0;
        
        if (!orderBy)
            orderBy = 'relevance';
        
        if (!min_range)
            min_range = 0;

        if (!max_range)
            max_range = 100000;
        
        const vehicles = await this.vehiclesRepository.listAvailableVehicles({
            page,
            fuel,
            gear,
            orderBy,
            start_date,
            end_date,
            max_range,
            min_range,
        });

        return vehicles;
    }
}