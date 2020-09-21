import ShowProfileService from "@modules/users/services/ShowProfileService";
import { Request, Response } from "express";
import { container } from 'tsyringe';

export default class ProfilesController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.body;

        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute(id);

        delete user.password;

        return response.json(user);
    }
}