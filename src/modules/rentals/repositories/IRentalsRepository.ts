import Vehicle from "@modules/vehicles/infra/typeorm/entities/Vehicle";
import Rental from "../infra/typeorm/entities/Rental";

import ICreateRentalDTO from "../dtos/ICreateRentalDTO";
import IFindRentalInPeriodDTO from "../dtos/IFindRentalInPeriodDTO";

export default interface IRentalsRepository {
    save(rental: Rental): Promise<void>;
    create(data: ICreateRentalDTO): Promise<Rental>;
    listUserRentals(id: string, page: number): Promise<Rental[]>;
    findInPeriod(data: IFindRentalInPeriodDTO): Promise<Rental[]>;
    //findFavoriteVehicle(user_id: string): Promise<Vehicle | undefined>;
}