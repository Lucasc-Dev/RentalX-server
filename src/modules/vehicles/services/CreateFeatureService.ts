import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Feature from "../infra/typeorm/entities/Feature";
import IFeaturesRepository from "../repositories/IFeaturesRepository";

interface Request {
    user_id: string;
    name: string;
    description: string;
}

@injectable()
export default class CreateFeatureService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('FeaturesRepository')
        private featuresRepository: IFeaturesRepository,
    ) {}

    public async execute({ user_id, name, description }: Request): Promise<Feature> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        const feature = this.featuresRepository.create({ name, description });

        return feature;
    }
}