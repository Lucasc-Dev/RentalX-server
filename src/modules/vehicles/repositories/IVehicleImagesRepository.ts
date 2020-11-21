import VehicleImage from "../infra/typeorm/entities/VehicleImage";

export default interface IVehicleImagesRepository {
    create(data: VehicleImage): Promise<VehicleImage>;
}