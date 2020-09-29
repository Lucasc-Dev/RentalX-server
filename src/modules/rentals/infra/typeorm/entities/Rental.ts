import User from "@modules/users/infra/typeorm/entities/User";
import Vehicle from "@modules/vehicles/infra/typeorm/entities/Vehicle";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('rentals')
export default class Rental {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;
    
    @Column()
    user: User;

    @Column()
    vehicle_id: string;

    @Column()
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