import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    image: string;

    @Column()
    role: string;

    @Column()
    password: string;

    @OneToMany(type => Rental, rental => rental.user_id)
    @JoinColumn({name: 'id'})
    rentals: Rental[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}