import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import Feature from './Feature';

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
    image: string;

    @Column()
    relevance: number;

    @ManyToMany(type => Feature)
    @JoinTable()
    features: Feature[];

    @Column()
    fuel: 'gasoline' | 'flex' | 'eletrical';

    @Column()
    gear: 'automatic' | 'manual';

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 