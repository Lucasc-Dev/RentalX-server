import Feature from "../infra/typeorm/entities/Feature";

export default interface ICreateVehicleDTO {
    name: string;
    brand: string;
    model: string;
    plate: string;
    daily_price: number;
    images: { image: string }[];
    features?: Feature[];
    fuel: 'gasoline' | 'flex' | 'eletrical';
    gear: 'manual' | 'automatic';
}