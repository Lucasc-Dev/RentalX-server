import { Request, Response } from "express";

export default class VehiclesController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        return response.json();
    }
}