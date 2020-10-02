import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import Rental from '@modules/rentals/infra/typeorm/entities/Rental';

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

    @Column()
    fuel: 'gasoline' | 'flex' | 'eletrical';

    @Column()
    gear: 'automatic' | 'manual';

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 