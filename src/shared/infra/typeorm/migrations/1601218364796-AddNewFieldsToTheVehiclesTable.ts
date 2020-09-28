import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNewFieldsToTheVehiclesTable1601218364796 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            'vehicles',
            [
                new TableColumn({
                    name: 'image',
                    type: 'varchar',
                    isNullable: true,
                }),
                new TableColumn({
                    name: 'relevance',
                    type: 'integer',
                    default: '0',
                }),
                new TableColumn({
                    name: 'available',
                    type: 'boolean',
                    default: 'true',
                }),
            ],
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vehicles', 'image');

        await queryRunner.dropColumn('vehicles', 'relevance');

        await queryRunner.dropColumn('vehicles', 'available');
    }

}
