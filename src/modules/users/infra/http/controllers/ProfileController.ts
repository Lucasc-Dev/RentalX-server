import { Request, Response } from "express";

export default class ProfilesController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.body;

        return response.json(id);
    }
}