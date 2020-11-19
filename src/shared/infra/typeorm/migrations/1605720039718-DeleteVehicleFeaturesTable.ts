import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class DeleteVehicleFeaturesTable1605720039718 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('featuresvehicle');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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

        await queryRunner.createForeignKey(
            'featuresvehicle',
            new TableForeignKey({
                name: 'CarID',
                referencedTableName: 'vehicles',
                columnNames: ['car_id'],
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'featuresvehicle',
            new TableForeignKey({
                name: 'FeatureID',
                referencedTableName: 'features',
                columnNames: ['feature_id'],
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

    }

}
