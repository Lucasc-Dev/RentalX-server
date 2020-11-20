import Feature from "../infra/typeorm/entities/Feature";
import Vehicle from "../infra/typeorm/entities/Vehicle";

export default interface IAddFeatureToVehicleDTO {
    vehicle: Vehicle;
    features: Feature[];
}