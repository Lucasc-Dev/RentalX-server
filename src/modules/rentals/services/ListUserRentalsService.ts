import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";
import Rental from "../infra/typeorm/entities/Rental";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IRentalsRepository from "../repositories/IRentalsRepository";

interface Request {
    user_id: string
    page?: number;
}

interface Response {
    rentals: Rental[];
    count: number;
}

@injectable()
export default class ListUserentalsService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
    ) {}

    public async execute({ user_id, page }: Request): Promise<Response> {
        const user = await this.usersRepository.findById(user_id);
        
        if (!user) {
            throw new AppError('User not found');
        }

        if (!page) {
            page = 0;
        }

        const [rentals, count] = await this.rentalsRepository.listUserRentals(user_id, page);

        return { rentals, count };
    }
}