import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { Repository } from "typeorm";
import User from "../entities/User";

export default class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(data);

        await this.ormRepository.save(user);

        return user;
    }
}