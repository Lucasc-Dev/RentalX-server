import { inject } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";

interface Request {
    user_id: string;
    vehicle_id: string;
    start_date: string;
    end_date: string;
}

export default class CreateRentService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ user_id, vehicle_id, start_date, end_date }: Request): Promise<void> {
        
    }
}