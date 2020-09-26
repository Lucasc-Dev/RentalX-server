import { getRepository, Repository } from "typeorm";

import Vehicle from "../entities/Vehicle";

import IVehiclesRepository from "@modules/vehicles/repositories/IVehiclesRepository";
import ICreateVehicleDTO from "@modules/vehicles/dtos/ICreateVehicleDTO";

export default class VehiclesRepository implements IVehiclesRepository {
    private ormRepository: Repository<Vehicle>

    constructor() {
        this.ormRepository = getRepository(Vehicle);
    }

    public async create(data: ICreateVehicleDTO): Promise<Vehicle> {
        const vehicle = this.ormRepository.create(data);

        await this.ormRepository.save(vehicle);

        return vehicle;
    }
}