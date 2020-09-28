export default interface IListVehiclesDTO {
    page: number; 
    fuel?: 'gasoline' | 'flex' | 'eletrical'; 
    gear?: 'manual' | 'automatic'; 
    orderBy: 'relevance' | 'lowest' | 'highest';
    min_range: number; 
    max_range: number;
}