import ICreateImageDTO from "../dtos/ICreateImageDTO";
import VehicleImage from "../infra/typeorm/entities/VehicleImage";

export default interface IVehicleImagesRepository {
    delete(id: string | string[]): Promise<void>;
    createMany(images: ICreateImageDTO[]): Promise<VehicleImage[]>;
}