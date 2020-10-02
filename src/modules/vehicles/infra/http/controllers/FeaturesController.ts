import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateFeatureService from "@modules/vehicles/services/CreateFeatureService";

export default class FeaturesController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { name, description } = request.body;

        const createFeature = container.resolve(CreateFeatureService);

        const feature = await createFeature.execute({ user_id, name, description });

        return response.json(feature);
    }
}