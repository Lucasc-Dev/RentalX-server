import { getRepository, Repository } from "typeorm";

import Feature from "../entities/Feature";

import ICreateFeatureDTO from "@modules/vehicles/dtos/ICreateFeatureDTO";
import IFeaturesRepository from "@modules/vehicles/repositories/IFeaturesRepository";

export default class FeaturesRepository implements IFeaturesRepository {
    private ormRepository: Repository<Feature>;

    constructor() {
        this.ormRepository = getRepository(Feature);
    }

    public async save(feature: Feature): Promise<void> {
        await this.ormRepository.save(feature);
    }

    public async create(data: ICreateFeatureDTO): Promise<Feature> {
        const feature = this.ormRepository.create(data);

        await this.ormRepository.save(feature);

        return feature;
    }

    public async findById(id: string): Promise<Feature | undefined> {
        const feature = await this.ormRepository.findOne(id);

        return feature;
    }
}