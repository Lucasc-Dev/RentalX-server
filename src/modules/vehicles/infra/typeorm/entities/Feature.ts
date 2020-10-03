import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import FeatureVehicle from "./FeatureVehicle";
import Vehicle from "./Vehicle";

@Entity('features')
export default class Feature {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column()
    description: string;
    
    @Column()
    icon: string;

    @OneToMany(type => FeatureVehicle, featureVehicle => featureVehicle.feature)
    feature_vehicle: FeatureVehicle[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}