import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class CreateRentalsTable1601355876958 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'rentals',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'vehicle_id',
                        type: 'uuid',
                    },
                    {
                        name: 'start_date',
                        type: 'varchar',
                    },
                    {
                        name: 'end_date',
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
                foreignKeys: [
                    new TableForeignKey({
                        name: 'UserID',
                        columnNames: ['user_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'users',
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    }),

                    new TableForeignKey({
                        name: 'VehicleID',
                        columnNames: ['vehicle_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'vehicles',
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    }),
                ]
            }),
        );

        await queryRunner.dropColumn('vehicles', 'available');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('rentals', 'UserID');
        await queryRunner.dropForeignKey('rentals', 'VehicleID');

        await queryRunner.dropTable('rentals');

        await queryRunner.addColumn(
            'vehicles',
            new TableColumn({
                name: 'available',
                type: 'boolean',
                default: 'true',
            }),
        );
    }

}
