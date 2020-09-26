import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class CreateFreaturesVehicleForeignKeyAndAddPlateFieldToVehiclesTable1601093151656 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'vehicles', 
            new TableColumn({
                name: 'plate',
                type: 'varchar',
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(
            'vehicles',
            'plate',
        );

        await queryRunner.dropForeignKey(
            'featuresvehicle',
            'CarID',
        );

        await queryRunner.dropForeignKey(
            'featuresvehicle',
            'FeatureID',
        );
    }

}
