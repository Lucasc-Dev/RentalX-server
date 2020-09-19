import { Request, Response } from 'express';

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        return response.json({ ok: true });
    }
}