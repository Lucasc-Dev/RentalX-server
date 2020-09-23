import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNewFieldsToUsersTable1600828724481 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users', 
            new TableColumn({
                name: 'image',
                type: 'varchar',
                isNullable: true,
            }),
        );

        await queryRunner.addColumn(
            'users', 
            new TableColumn({
                name: 'role',
                type: 'varchar',
                default: 'user',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'image');
        await queryRunner.dropColumn('users', 'role');
    }

}
