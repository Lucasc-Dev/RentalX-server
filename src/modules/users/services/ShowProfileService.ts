import { injectable, inject } from 'tsyringe';

import User from "../infra/typeorm/entities/User";
import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IVehiclesRepository from '@modules/vehicles/repositories/IVehiclesRepository';

interface Response {
    user: User;
    favorite_vehicle?: {
        vehicle?: Vehicle;
        times_used: number;
    };
}

@injectable()
export default class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,

        @inject('VehiclesRepository')
        private vehiclesRepository: IVehiclesRepository,
    ){}

    public async execute(id: string): Promise<Response> {
        const user = await this.usersRepository.findById(id);
        
        if (!user) {
            throw new AppError('Invalid JWT token.');
        }

        const favorite_vehicle_id = await this.rentalsRepository.findFavoriteVehicleId(user.id);

        let favorite_vehicle;

        if (favorite_vehicle_id) {
            const vehicle = await this.vehiclesRepository.findById(favorite_vehicle_id.vehicle_id);

            favorite_vehicle = {
                vehicle,
                times_used: favorite_vehicle_id.count,
            };
        }
        
        return { user, favorite_vehicle };
    }
}