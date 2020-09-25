import { Request, Response } from "express";

export default class CarsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        return response.json();
    }
}