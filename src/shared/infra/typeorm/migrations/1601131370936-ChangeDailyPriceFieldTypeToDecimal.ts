import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class ChangeDailyPriceFieldTypeToDecimal1601131370936 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vehicles', 'daily_price');

        await queryRunner.addColumn(
            'vehicles',
            new TableColumn({
                name: 'daily_price',
                type: 'decimal',
                precision: 10,
                scale: 2,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vehicles', 'daily_price');

        await queryRunner.addColumn(
            'vehicles',
            new TableColumn({
                name: 'daily_price',
                type: 'varchar',
            }),
        );
    }

}
