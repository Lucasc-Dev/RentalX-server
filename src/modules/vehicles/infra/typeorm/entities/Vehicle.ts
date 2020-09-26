import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
    fuel: string;

    @Column()
    gear: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 