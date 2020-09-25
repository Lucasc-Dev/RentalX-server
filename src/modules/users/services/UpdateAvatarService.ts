import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";
import uploadConfig from "@config/upload";

import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import IUsersRepository from "../repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";

interface Request {
    id: string;
    filename: string;
}

@injectable()
export default class UpdateAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ){}

    public async execute({ id, filename }: Request): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('User not found');
        }

        if (user.image) {
            const image = user.image.split('/files/');

            await this.storageProvider.deleteFile(image[image.length - 1]);
        }

        await this.storageProvider.saveFile(filename);

        user.image = `${uploadConfig.link}${filename}`

        await this.usersRepository.save(user);

        return user;
    } 
}