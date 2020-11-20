import { Brackets, getRepository, Repository } from "typeorm";

import Vehicle from "../entities/Vehicle";

import IVehiclesRepository from "@modules/vehicles/repositories/IVehiclesRepository";
import ICreateVehicleDTO from "@modules/vehicles/dtos/ICreateVehicleDTO";
import IListVehiclesDTO from "@modules/vehicles/dtos/IListVehiclesDTO";
import IAddFeatureToVehicleDTO from "@modules/vehicles/dtos/IAddFeatureToVehicleDTO";

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
        const vehicle = await this.ormRepository.findOne(id);

        return vehicle;
    }

    public async findByPlate(plate: string): Promise<Vehicle | undefined> {
        const vehicle = await this.ormRepository.findOne({ where: { plate } });

        return vehicle;
    }

    public async findVehicle(id: string): Promise<Vehicle | undefined> {
        let vehicle = await this.ormRepository.findOne({ where: { id } })
        
        if (!vehicle) {
            vehicle = await this.ormRepository.findOne({ where: { plate: id } })
        }

        return vehicle;
    }

    public async listAvailableVehicles({ 
        page, start_date, end_date, min_range, max_range, fuel, gear, search, orderBy 
    }: IListVehiclesDTO): Promise<[Vehicle[], number]> {
        const query = this.ormRepository
            .createQueryBuilder('vehicle')
            .leftJoin('vehicle.rentals', 'rental')
            .leftJoinAndSelect('vehicle.images', 'images')
            .where(
                'vehicle.daily_price >= :min_range AND vehicle.daily_price <= :max_range', 
                { min_range, max_range },        
            ).andWhere(
                new Brackets(qb => {
                    qb.where(
                        'rental.start_date NOT BETWEEN :start_date AND :end_date',
                        { start_date, end_date },
                    ).andWhere(
                        'rental.end_date NOT BETWEEN :start_date AND :end_date',
                        { start_date, end_date },
                    ).andWhere(
                        `:start_date NOT BETWEEN rental.start_date AND rental.end_date AND
                         :end_date NOT BETWEEN rental.start_date AND rental.end_date`,
                        { start_date, end_date },
                    ).orWhere('rental IS NULL')
                })
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

        if (search) {
            query.andWhere(
                'vehicle.name ILIKE :search OR vehicle.brand ILIKE :search',
                { search: `%${search}%` }
            );
        }

        if (fuel) {
            query.andWhere('vehicle.fuel = :fuel', { fuel });
        }
        
        if (gear) {
            query.andWhere('vehicle.gear = :gear', { gear });
        }

        query.skip(page * 5).take(5);

        const vehicles = await query.getManyAndCount();
 
        return vehicles;
    }

    public async addFeaturesToVehicle({ vehicle, features }: IAddFeatureToVehicleDTO): Promise<Vehicle | undefined> {
        await this.ormRepository
            .createQueryBuilder('vehicle')
            .relation(Vehicle, 'features')
            .of(vehicle)
            .add(features);

        return vehicle;
    }
}