import ShowProfileService from "@modules/users/services/ShowProfileService";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";
import { Request, Response } from "express";
import { container } from 'tsyringe';

export default class ProfilesController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute(id);

        return response.json(user);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const { name, email, oldPassword, password } = request.body;

        const updateProfile = container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({ id, name, email, oldPassword, password });

        return response.json(user);
    }
}