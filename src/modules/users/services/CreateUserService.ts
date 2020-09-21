import { inject, injectable } from 'tsyringe';
import IUsersRepository from "../repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
    name: string;
    email: string;
    password: string;
}

@injectable()
export default class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ name, email, password }: Request): Promise<User> {
        const findEmail = await this.usersRepository.findByEmail(email);

        if (findEmail) {
            throw new AppError('Email already registred');
        }

        password = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({ name, email, password });

        return user;
    }
}