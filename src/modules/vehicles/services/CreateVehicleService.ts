import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";

interface Request {
    user_id: string;
    name: string;
    brand: string;
    model: string;
    plate: string;
    daily_price: number;
    fuel: 'gasoline' | 'ethanol' | 'eletrical';
    gear: 'manual' | 'automatic';
}

@injectable()
export default class CreateVehicleService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(
        { user_id, name, brand, model, plate, daily_price, fuel, gear }: Request
    ): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        if (user.role !== 'admin') {
            throw new AppError('Only administrator users can create vehicles');
        }

        console.log('test')


    }
}