import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateRentService from "@modules/rentals/services/CreateRentalService";

export default class RentalsController {
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