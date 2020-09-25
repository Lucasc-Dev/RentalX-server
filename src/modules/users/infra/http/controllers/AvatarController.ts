import UpdateAvatarService from "@modules/users/services/UpdateAvatarService";
import { Request, Response } from "express";
import { container } from 'tsyringe';

export default class AvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const { filename } = request.file;

        const updateAvatar = container.resolve(UpdateAvatarService);

        const user = await updateAvatar.execute({ id, filename });

        return response.json(user);
    }
}