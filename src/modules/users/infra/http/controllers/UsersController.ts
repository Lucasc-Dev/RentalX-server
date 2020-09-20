import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const {
            name,
            email,
            password
        } = request.body;

        const repository = new UsersRepository();

        const createUser = new CreateUserService(repository);

        console.log(createUser.repository);

        const user = await createUser.execute({ name, email, password });

        return response.json(user);
    }
}