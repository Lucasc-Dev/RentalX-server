import { getRepository, Repository } from "typeorm";

import Vehicle from "../entities/Vehicle";

import IVehiclesRepository from "@modules/vehicles/repositories/IVehiclesRepository";
import ICreateVehicleDTO from "@modules/vehicles/dtos/ICreateVehicleDTO";
import IListVehiclesDTO from "@modules/vehicles/dtos/IListVehiclesDTO";

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

    public async findByPlate(plate: string): Promise<Vehicle | undefined> {
        const vehicle = this.ormRepository.findOne({ where: { plate } });

        return vehicle;
    }

    public async findAll({ page, fuel, gear, min_range, max_range }: IListVehiclesDTO): Promise<Vehicle[]> {
        const vehicles = this.ormRepository
            .createQueryBuilder('vehicle')
            .where('vehicle.fuel = :fuel', { fuel })
            .andWhere('vehicle.gear = :gear', { gear })
            .andWhere('vehicle.daily_price > :min_range', { min_range })
            .andWhere('vehicle.daily_price < :max_range', { max_range })
            .skip(page * 5)
            .take(5)
            .getMany();

        /* let photos = await 
        getRepository(Vehicle)
        .createQueryBuilder("photo") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
        .innerJoinAndSelect("photo.metadata", "metadata")
        .leftJoinAndSelect("photo.albums", "album")
        .where("photo.isPublished = true")
        .andWhere("(photo.name = :photoName OR photo.name = :bearName)")
        .orderBy("photo.id", "DESC")
        .skip(5)
        .take(10)
        .setParameters({ photoName: "My", bearName: "Mishka" })
        .getMany(); */

        return vehicles;
    }
}