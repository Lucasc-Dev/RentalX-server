import { Brackets, getRepository, Repository } from "typeorm";

import Rental from "../entities/Rental";

import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";
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
        const rentals = await this.ormRepository
            .createQueryBuilder('rental')
            .where('rental.vehicle_id = :vehicle_id', { vehicle_id })
            .andWhere(
                new Brackets(qb => {
                    qb.where(
                        'rental.start_date BETWEEN :start_date AND :end_date',
                        { start_date, end_date },
                    ).orWhere(
                        'rental.end_date BETWEEN :start_date AND :end_date',
                        { start_date, end_date },
                    ).orWhere(
                        `:start_date BETWEEN rental.start_date AND rental.end_date AND
                         :end_date BETWEEN rental.start_date AND rental.end_date`,
                        { start_date, end_date },
                    )
                })
            ).getMany();

        return rentals;
    }

    public async listUserRentals(id: string, page: number): Promise<Rental[]> {
        const rentals = await this.ormRepository
            .createQueryBuilder('rental')
            .innerJoinAndSelect('rental.vehicle', 'vehicle')
            .where('rental.user_id = :id', { id })
            .orderBy('rental.created_at', 'ASC')
            .skip(page * 5)
            .take(5)
            .getMany();

        return rentals;
    }
}