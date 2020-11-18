import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import FeatureVehicle from './FeatureVehicle';
import VehicleImage from './VehicleImage';

@Entity('vehicles')
export default class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(type => Rental, rental => rental.vehicle)
    rentals: Rental[];

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    plate: string;

    @Column()
    daily_price: number;

    @Column()
    relevance: number;

    @OneToMany(type => FeatureVehicle, feature => feature.vehicle)
    feature_vehicle: FeatureVehicle;

    @Column()
    fuel: 'gasoline' | 'flex' | 'eletrical';

    @Column()
    gear: 'automatic' | 'manual';

    @OneToMany(type => VehicleImage, image => image.vehicle, { 
        cascade: ['insert', 'update'],
        eager: true,
    })
    images: VehicleImage[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 