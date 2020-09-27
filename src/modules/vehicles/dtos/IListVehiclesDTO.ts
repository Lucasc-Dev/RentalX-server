export default interface IListVehiclesDTO {
    page: number; 
    fuel?: string; 
    gear?: string; 
    min_range: number; 
    max_range: number;
}