import ICreateRentalDTO from "../dtos/ICreateRentalDTO";
import Rental from "../infra/typeorm/entities/Rental";

export default interface IRentalsRepository {
    save(rental: Rental): Promise<void>;
    create(data: ICreateRentalDTO): Promise<Rental>;
}