import AddFeaturesToVehicleService from "@modules/vehicles/services/AddFeaturesToVehicleService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class VehicleFeaturesController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { vehicle_id } = request.params;
        const { features } = request.body;

        const addFeaturesToVehicle = container.resolve(AddFeaturesToVehicleService);

        const vehicle = await addFeaturesToVehicle.execute({ user_id, vehicle_id, features });

        return response.json(vehicle);
    }
}