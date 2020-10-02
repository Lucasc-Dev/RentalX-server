import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @ManyToMany(type => Vehicle, vehicle => vehicle.id)
    vehicles: Vehicle[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}