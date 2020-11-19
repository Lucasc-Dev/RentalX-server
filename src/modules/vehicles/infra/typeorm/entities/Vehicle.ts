import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import VehicleImage from './VehicleImage';
import Feature from './Feature';

@Entity('vehicles')
export default class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @Column()
    fuel: 'gasoline' | 'flex' | 'eletrical';

    @Column()
    gear: 'automatic' | 'manual';

    @ManyToMany(type => Feature, { 
        cascade: ['insert', 'update'],
        eager: true,
    })
    @JoinTable()
    features: Feature[];

    @OneToMany(type => VehicleImage, image => image.vehicle, { 
        cascade: ['insert', 'update'],
        eager: true,
    })
    images: VehicleImage[];

    @OneToMany(type => Rental, rental => rental.vehicle)
    rentals: Rental[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 