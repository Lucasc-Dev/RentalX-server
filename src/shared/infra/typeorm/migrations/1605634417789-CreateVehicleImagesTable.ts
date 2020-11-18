import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class CreateVehicleImagesTable1605634417789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'vehicle_image',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'image',
                    type: 'varchar',
                },
                {
                    name: 'vehicle_id',
                    type: 'uuid',
                },
            ],
            foreignKeys: [
                {
                    name: 'VehicleImage',
                    columnNames: ['vehicle_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'vehicles',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }
            ],
        }));

        await queryRunner.dropColumn('vehicles', 'image');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('vehicle_image', 'VehicleImage');

        await queryRunner.dropTable('vehicle_image');

        await queryRunner.addColumn(
            'vehicles', 
            new TableColumn({
                name: 'image',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

}
