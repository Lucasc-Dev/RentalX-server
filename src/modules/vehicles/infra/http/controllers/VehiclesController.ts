import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateVehicleService from "@modules/vehicles/services/CreateVehicleService";
import DeleteVehicleService from "@modules/vehicles/services/DeleteVehicleService";
import ListVehiclesService from "@modules/vehicles/services/ListVehiclesService";
import ShowVehicleService from "@modules/vehicles/services/ShowVehicleService";
import UpdateVehicleService from "@modules/vehicles/services/UpdateVehicleService";

interface RequestBody {
    page?: number;
    search?: string;
    fuel?: 'gasoline' | 'flex' | 'eletrical'; 
    gear?: 'manual' | 'automatic';
    orderBy?: 'relevance' | 'lowest' | 'highest';
    min_range?: number;
    max_range?: number;
    start_date: string;
    end_date: string;
}

export default class VehiclesController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { vehicle_id } = request.params;

        const showVehicle = container.resolve(ShowVehicleService);

        const vehicle = await showVehicle.execute({ user_id, vehicle_id });

        return response.json(vehicle);
    }
    
    public async index(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        
        const { 
            page, 
            fuel, 
            gear, 
            search,
            orderBy,
            min_range,
            max_range, 
            start_date: start,
            end_date: end,
        } = request.query as unknown as RequestBody;

        const start_date = new Date(start);
        const end_date = new Date(end);

        const listVehicles = container.resolve(ListVehiclesService);

        const vehicles = await listVehicles.execute({ 
            user_id, 
            page,
            fuel,
            gear, 
            search,
            orderBy,
            start_date,
            end_date,
            min_range,
            max_range,
        });

        return response.json(vehicles);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { vehicle_id } = request.params;

        const {
            name,
            brand,
            model,
            fuel,
            gear,
            plate,
            daily_price,
        } = request.body;

        const updateVehicle = container.resolve(UpdateVehicleService);

        const vehicle = await updateVehicle.execute({ 
            user_id,
            vehicle_id,
            name,
            brand,
            model,
            fuel,
            gear,
            plate,
            daily_price,
        });

        return response.json(vehicle);
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

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { vehicle_id } = request.params;

        const deleteVehicle = container.resolve(DeleteVehicleService);

        await deleteVehicle.execute({ user_id, vehicle_id });

        return response.json();
    }
}