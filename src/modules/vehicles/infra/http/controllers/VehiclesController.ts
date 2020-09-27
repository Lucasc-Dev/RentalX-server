import CreateVehicleService from "@modules/vehicles/services/CreateVehicleService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class VehiclesController {
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