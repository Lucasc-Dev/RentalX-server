import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public repository: IUsersRepository;

    constructor(repository: IUsersRepository) {
        this.repository = repository;
    }

    public async execute({ name, email, password }: Request): Promise<User> {
        const user = await this.repository.create({ name, email, password });

        return user;
    }
}