import { inject, injectable } from "tsyringe";

import Feature from "../infra/typeorm/entities/Feature";
import AppError from "@shared/errors/AppError";
import uploadConfig from '@config/upload';

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IFeaturesRepository from "../repositories/IFeaturesRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

interface Request {
    user_id: string;
    feature_id: string;
    filename: string;
}

@injectable()
export default class UpdateFeatureIconService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('FeaturesRepository')
        private featuresRepository: IFeaturesRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, feature_id, filename }: Request): Promise<Feature> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        if (user.role !== 'admin') {
            throw new AppError('Only administrator users can create vehicles');
        }

        const feature = await this.featuresRepository.findById(feature_id);

        if (!feature) {
            throw new AppError('Feature not found');
        }

        if (feature.icon) {
            const image = feature.icon.split('/files/');

            await this.storageProvider.deleteFile(image[image.length - 1]);
        }

        await this.storageProvider.saveFile(filename);

        feature.icon = `${uploadConfig.link}${filename}`;

        await this.featuresRepository.save(feature);

        return feature;
    }
}