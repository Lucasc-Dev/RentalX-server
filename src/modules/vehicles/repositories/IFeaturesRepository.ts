import ICreateFeatureDTO from "../dtos/ICreateFeatureDTO";
import Feature from "../infra/typeorm/entities/Feature";

export default interface IFeaturesRepository {
    create(data: ICreateFeatureDTO): Promise<Feature>;
}