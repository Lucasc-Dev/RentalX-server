import AddFeatureToVehicleService from "@modules/vehicles/services/AddFeatureToVehicleService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class VehicleFeaturesController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { vehicle_id, feature_id } = request.params;

        const addFeatureToVehicle = container.resolve(AddFeatureToVehicleService);

        const vehicle = await addFeatureToVehicle.execute({ user_id, vehicle_id, feature_id });

        return response.json(vehicle);
    }
}