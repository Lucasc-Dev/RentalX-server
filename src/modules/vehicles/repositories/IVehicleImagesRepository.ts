import VehicleImage from "../infra/typeorm/entities/VehicleImage";

export default interface IVehicleImagesRepository {
    save(data: VehicleImage): Promise<void>;
    create(data: VehicleImage): Promise<VehicleImage>;
}