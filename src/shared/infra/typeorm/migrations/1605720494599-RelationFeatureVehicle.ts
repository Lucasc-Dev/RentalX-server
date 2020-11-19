import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationFeatureVehicle1605720494599 implements MigrationInterface {
    name = 'RelationFeatureVehicle1605720494599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicles_features_features" ("vehiclesId" uuid NOT NULL, "featuresId" uuid NOT NULL, CONSTRAINT "PK_4fc91f8ee9a33bd6d99cf6ec5e8" PRIMARY KEY ("vehiclesId", "featuresId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9eb50c0fa39f00258fc24b46a9" ON "vehicles_features_features" ("vehiclesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a5db0e27d91e96540864f4264a" ON "vehicles_features_features" ("featuresId") `);
        await queryRunner.query(`ALTER TABLE "vehicles_features_features" ADD CONSTRAINT "FK_9eb50c0fa39f00258fc24b46a95" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles_features_features" ADD CONSTRAINT "FK_a5db0e27d91e96540864f4264ae" FOREIGN KEY ("featuresId") REFERENCES "features"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles_features_features" DROP CONSTRAINT "FK_a5db0e27d91e96540864f4264ae"`);
        await queryRunner.query(`ALTER TABLE "vehicles_features_features" DROP CONSTRAINT "FK_9eb50c0fa39f00258fc24b46a95"`);
        await queryRunner.query(`DROP INDEX "IDX_a5db0e27d91e96540864f4264a"`);
        await queryRunner.query(`DROP INDEX "IDX_9eb50c0fa39f00258fc24b46a9"`);
        await queryRunner.query(`DROP TABLE "vehicles_features_features"`);
    }

}
