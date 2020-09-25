import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCarsTable1601036937992 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cars',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'brand',
                        type: 'varchar',
                    },
                    {
                        name: 'model',
                        type: 'varchar',
                    },
                    {
                        name: 'daily_price',
                        type: 'varchar',
                    },
                    {
                        name: 'fuel',
                        type: 'varchar',
                    },
                    {
                        name: 'gear',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cars');
    }

}
