import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateRentService from "@modules/rentals/services/CreateRentalService";
import ListUserRentalsService from "@modules/rentals/services/ListUserRentalsService";

export default class RentalsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { page } = request.query;

        const listUserRentals = container.resolve(ListUserRentalsService);

        const rentals = await listUserRentals.execute({ user_id, page: Number(page) });
        
        return response.json(rentals);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { 
            vehicle_id, 
            start_date: start, 
            end_date: end, 
        } = request.body;

        const start_date = new Date(start);
        const end_date = new Date(end);

        const createRent = container.resolve(CreateRentService);

        const rental = await createRent.execute({ 
            user_id, vehicle_id, start_date, end_date
        });
        
        return response.json(rental);
    }
}