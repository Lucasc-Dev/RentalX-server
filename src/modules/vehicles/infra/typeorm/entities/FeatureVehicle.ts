import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Feature from "./Feature";
import Vehicle from "./Vehicle";

@Entity('featuresvehicle')
export default class FeatureVehicle {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    vehicle_id: string;

    @ManyToOne(type => Vehicle, vehicle => vehicle.feature_vehicle)
    @JoinColumn({ name: 'vehicle_id' })
    vehicle: Vehicle;

    @Column()
    feature_id: string;

    @ManyToOne(type => Feature, feature => feature.feature_vehicle)
    @JoinColumn({ name: 'feature_id' })
    feature: Feature;
}