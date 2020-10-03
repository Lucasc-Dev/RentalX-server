import { injectable, inject } from 'tsyringe';

import User from "../infra/typeorm/entities/User";
import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';

interface Response {
    user: User;
    favorite_vehicle?: Vehicle;
}

@injectable()
export default class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
    ){}

    public async execute(id: string): Promise<Response> {
        const user = await this.usersRepository.findById(id);
        
        if (!user) {
            throw new AppError('Invalid JWT token.');
        }

        const favorite_vehicle = await this.rentalsRepository.findById(user.id);

        return { user, favorite_vehicle };
    }
}