export default interface IListVehiclesDTO {
    page: number; 
    fuel?: 'gasoline' | 'flex' | 'eletrical'; 
    gear?: 'manual' | 'automatic'; 
    orderBy: 'relevance' | 'lowest' | 'highest';
    start_date: Date;
    end_date: Date;
    min_range: number; 
    max_range: number;
}