import { getRepository, Repository } from "typeorm";

import VehicleImage from "../entities/VehicleImage";

import ICreateImageDTO from "@modules/vehicles/dtos/ICreateImageDTO";
import IVehicleImagesRepository from "@modules/vehicles/repositories/IVehicleImagesRepository";

export default class VehicleImageRepository implements IVehicleImagesRepository {
    private ormRepository: Repository<VehicleImage>;

    constructor() {
        this.ormRepository = getRepository(VehicleImage)
    }

    public async createMany(images: ICreateImageDTO[]): Promise<VehicleImage[]> {
        const imagesEntites = this.ormRepository.create(images);

        return imagesEntites;
    }

    public async delete(id: string | string[]): Promise<void> {
        this.ormRepository.delete(id);
    }
}