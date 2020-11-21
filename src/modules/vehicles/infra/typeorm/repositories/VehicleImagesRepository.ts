import { getRepository, Repository } from "typeorm";

import VehicleImage from "../entities/VehicleImage";

import IVehicleImagesRepository from "@modules/vehicles/repositories/IVehicleImagesRepository";

export default class VehicleImageRepository implements IVehicleImagesRepository {
    private ormRepository: Repository<VehicleImage>;

    constructor() {
        this.ormRepository = getRepository(VehicleImage);
    }

    public async create(data: VehicleImage): Promise<VehicleImage> {
        const vehicleImage = await this.ormRepository.create(data);

        return vehicleImage;
    }

    public async save(data: VehicleImage): Promise<void> {
        await this.ormRepository.create(data);
    }
}