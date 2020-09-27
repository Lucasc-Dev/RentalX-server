import ICreateVehicleDTO from "../dtos/ICreateVehicleDTO";
import IListVehiclesDTO from "../dtos/IListVehiclesDTO";
import Vehicle from "../infra/typeorm/entities/Vehicle";

export default interface IVehiclesRepository {
    create(data: ICreateVehicleDTO): Promise<Vehicle>;
    findByPlate(plate: string): Promise<Vehicle | undefined>;
    findAll(data: IListVehiclesDTO): Promise<Vehicle[]>;
}