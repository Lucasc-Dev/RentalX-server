import ICreateFeatureDTO from "../dtos/ICreateFeatureDTO";
import Feature from "../infra/typeorm/entities/Feature";

export default interface IFeaturesRepository {
    save(feature: Feature): Promise<void>;
    create(data: ICreateFeatureDTO): Promise<Feature>;
    findById(id: string): Promise<Feature | undefined>;
}