import UpdateVehicleImageService from "@modules/vehicles/services/UpdateVehicleImageService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class VehicleImageController {
    public async update(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { vehicle_id } = request.params;    

        const requestImages = request.files as Express.Multer.File[];
        
        const images = requestImages.map(file => file.filename);

        const updateVehicleImage = container.resolve(UpdateVehicleImageService);

        const vehicle = await updateVehicleImage.execute({ user_id, vehicle_id, images });

        return response.json(vehicle);
    }
}