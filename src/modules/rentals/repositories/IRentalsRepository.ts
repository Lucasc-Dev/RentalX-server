import ICreateRentalDTO from "../dtos/ICreateRentalDTO";
import IFindRentalInPeriodDTO from "../dtos/IFindRentalInPeriodDTO";
import Rental from "../infra/typeorm/entities/Rental";

export default interface IRentalsRepository {
    save(rental: Rental): Promise<void>;
    create(data: ICreateRentalDTO): Promise<Rental>;
    findInPeriod(data: IFindRentalInPeriodDTO): Promise<Rental[]>;
    listUserRentals(id: string, page: number): Promise<Rental[]>;
}