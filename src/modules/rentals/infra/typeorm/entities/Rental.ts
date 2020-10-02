import User from "@modules/users/infra/typeorm/entities/User";
import Vehicle from "@modules/vehicles/infra/typeorm/entities/Vehicle";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('rentals')
export default class Rental {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;
    
    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    vehicle_id: string;

    @ManyToOne(() => Vehicle, vehicle => vehicle.rentals)
    @JoinColumn({ name: 'vehicle_id' })
    vehicle: Vehicle;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}