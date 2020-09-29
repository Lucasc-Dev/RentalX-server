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