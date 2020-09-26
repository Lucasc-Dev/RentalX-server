import ICreateVehicleDTO from "../dtos/ICreateVehicleDTO";
import Vehicle from "../infra/typeorm/entities/Vehicle";

export default interface IVehiclesRepository {
    create(data: ICreateVehicleDTO): Promise<Vehicle>;
}