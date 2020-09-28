export default interface ICreateVehicleDTO {
    name: string;
    brand: string;
    model: string;
    plate: string;
    daily_price: number;
    fuel: 'gasoline' | 'flex' | 'eletrical';
    gear: 'manual' | 'automatic';
}