import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFeaturesVehicleTable1601048574446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'featuresvehicle',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'car_id',
                        type: 'uuid',
                    },
                    {
                        name: 'feature_id',
                        type: 'uuid',
                    },
                    {
                        name: 'info',
                        type: 'varchar',
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('featuresvehicle')
    }

}
