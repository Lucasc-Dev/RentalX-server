import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';

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
    ) {}

    public async execute({ email, password }: Request): Promise<User> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email/password combination does not exist.');
        }

        if ( user.password !== password ) {
            throw new AppError('Email/password combination does not exist.');
        }

        return user;
    }
}