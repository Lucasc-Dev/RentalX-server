import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import Rental from '@modules/rentals/infra/typeorm/entities/Rental';

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
    @Exclude()
    password: string;

    @OneToMany(type => Rental, rental => rental.user_id)
    @JoinColumn({name: 'id'})
    rentals: Rental[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'image_url' })
    getAvatarUrl(): string {
        return this.image 
            ? `${process.env.UPLOAD_LINK}${this.image}`
            : `${process.env.UPLOAD_LINK}default-avatar.png`;
    }
}