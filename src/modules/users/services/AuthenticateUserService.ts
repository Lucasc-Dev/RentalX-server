import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
    email: string;
    password: string;
}

@injectable()
export default class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ email, password }: Request): Promise<User> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Wrong email/password combination.');
        }

        const comparePassword = await this.hashProvider.compareHash(password, user.password);

        if (!comparePassword) {
            throw new AppError('Wrong email/password combination.');
        }

        return user;
    }
}