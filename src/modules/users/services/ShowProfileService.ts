import { injectable, inject } from 'tsyringe';

import User from "../infra/typeorm/entities/User";
import IUsersRepository from '../repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

@injectable()
export default class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ){}

    public async execute(id: string): Promise<User> {
        const user = await this.usersRepository.findById(id);
        
        if (!user) {
            throw new AppError('Invalid JWT token.');
        }

        return user;
    }
}