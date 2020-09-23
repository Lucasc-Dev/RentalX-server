import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import User from "../infra/typeorm/entities/User";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
    id: string;
    name: string;
    email: string;
    oldPassword?: string;
    password?: string;
}

@injectable()
export default class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ id, name, email, oldPassword, password }: Request): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('User not found');
        }

        if (email !== user.email) {
            const findEmail = await this.usersRepository.findByEmail(email);
    
            if (findEmail) {
                throw new AppError('Email already registered');
            }
        }

        if (oldPassword) {
            const compare = await this.hashProvider.compareHash(oldPassword, user.password);

            if (!compare) {
                throw new AppError('Old password does not match');
            }

            if (password) {
                user.password = await this.hashProvider.generateHash(password);
            }
        }

        user.name = name;
        user.email = email;

        await this.usersRepository.save(user);

        return user;
    }
}