import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateFeatureService from "@modules/vehicles/services/CreateFeatureService";
import UpdateFeatureIconService from "@modules/vehicles/services/UpdateFeatureIconService";

export default class FeaturesController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { name, description } = request.body;

        const createFeature = container.resolve(CreateFeatureService);

        const feature = await createFeature.execute({ user_id, name, description });

        return response.json(feature);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { feature_id } = request.params;
        const { filename } = request.file;

        const updateFeatureIcon = container.resolve(UpdateFeatureIconService);

        const feature = await updateFeatureIcon.execute({ user_id, feature_id, filename });

        return response.json(feature);
    }
}