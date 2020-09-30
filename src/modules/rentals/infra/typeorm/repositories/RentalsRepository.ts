import { getRepository, Repository } from "typeorm";

import Rental from "../entities/Rental";

import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";
import Vehicle from "@modules/vehicles/infra/typeorm/entities/Vehicle";
import IFindRentalInPeriodDTO from "@modules/rentals/dtos/IFindRentalInPeriodDTO";

export default class RentalsRepository implements IRentalsRepository {
    private ormRepository: Repository<Rental>;

    constructor() {
        this.ormRepository = getRepository(Rental);
    }

    public async create(data: ICreateRentalDTO): Promise<Rental> {
        const rental = this.ormRepository.create(data);

        await this.ormRepository.save(rental);

        return rental;
    }

    public async save(rental: Rental): Promise<void> {
        await this.ormRepository.save(rental);
    }

    public async findInPeriod({ 
        vehicle_id, start_date, end_date 
    }: IFindRentalInPeriodDTO): Promise<Rental[]> {
        const rentals = await this.ormRepository.find({ where: { vehicle_id } });

        return rentals;
    }
}