import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";
import Vehicle from "./Vehicle";

@Entity('vehicle_image')
export default class VehicleImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    image: string;

    @ManyToOne(type => Vehicle, vehicle => vehicle.images)
    @JoinColumn({ name: 'vehicle_id' })
    vehicle: Vehicle[];

    @Expose({ name: 'image_url' })
    getImageUrl(): string {
        return `${process.env.UPLOAD_LINK}${this.image}`;
    }
}