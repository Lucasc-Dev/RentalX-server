import CreateVehicleService from "@modules/vehicles/services/CreateVehicleService";
import ListVehiclesService from "@modules/vehicles/services/ListVehiclesService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class VehiclesController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { page, fuel, gear, min_range, max_range } = request.query;

        const listVehicles = container.resolve(ListVehiclesService);

        const vehicles = await listVehicles.execute({ 
            user_id, 
            page: Number(page),
            fuel: String(fuel),
            gear: String(gear),
            min_range: Number(min_range),
            max_range: Number(max_range),
        });

        return response.json(vehicles);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const {
            name,
            brand,
            model,
            plate,
            daily_price,
            fuel,
            gear,
        } = request.body;

        const createVehicle = container.resolve(CreateVehicleService);

        const vehicle = await createVehicle.execute({
            user_id,
            name,
            brand,
            model,
            plate,
            daily_price,
            fuel,
            gear,
        });

        return response.json(vehicle);
    }
}