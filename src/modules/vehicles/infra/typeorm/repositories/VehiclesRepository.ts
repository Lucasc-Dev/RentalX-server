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

    public async save(vehicle: Vehicle): Promise<void> {
        await this.ormRepository.save(vehicle);
    }

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }

    public async findById(id: string): Promise<Vehicle | undefined> {
        const vehicle = this.ormRepository.findOne(id);

        return vehicle;
    }

    public async findByPlate(plate: string): Promise<Vehicle | undefined> {
        const vehicle = this.ormRepository.findOne({ where: { plate } });

        return vehicle;
    }

    public async listVehicles({ page, min_range, max_range, fuel, gear, orderBy }: IListVehiclesDTO): Promise<Vehicle[]> {
        const query = this.ormRepository.createQueryBuilder('vehicle');
        query.where(
            'vehicle.daily_price >= :min_range and vehicle.daily_price <= :max_range', 
            { min_range, max_range },        
        ).andWhere(
            "vehicle.image != '' and vehicle.available = true"
        );

        switch (orderBy) {
            case 'relevance':
                query.orderBy('vehicle.relevance', 'DESC');
                break;
            case 'lowest':
                query.orderBy('vehicle.daily_price', 'ASC');
                break;
            case 'highest':
                query.orderBy('vehicle.daily_price', 'DESC');
                break;
            default: 
                query.orderBy('vehicle.relevance', 'DESC');
                break;
        }

        if (fuel) {
            query.andWhere('vehicle.fuel = :fuel', { fuel });
        }
        
        if (gear) {
            query.andWhere('vehicle.gear = :gear', { gear });
        }

        query.skip(page * 5).take(5)

        const vehicles = await query.getMany();

        return vehicles;
    }
}