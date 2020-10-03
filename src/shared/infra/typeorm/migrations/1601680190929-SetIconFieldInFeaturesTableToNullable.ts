import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class SetIconFieldInFeaturesTableToNullable1601680190929 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('features', 'icon');

        await queryRunner.addColumn(
            'features',
            new TableColumn({
                name: 'icon',
                type: 'varchar',
                isNullable: true,
            })
        )

        await queryRunner.renameColumn('featuresvehicle', 'car_id', 'vehicle_id')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('features', 'icon');

        await queryRunner.addColumn(
            'features',
            new TableColumn({
                name: 'icon',
                type: 'varchar',
                default: `''`
            })
        );

        await queryRunner.renameColumn('featuresvehicle', 'vehicle_id', 'car_id');
    }

}
