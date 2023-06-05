import { MigrationInterface, QueryRunner } from "typeorm";

export class StufuffEntity1685910956033 implements MigrationInterface {
    name = 'StufuffEntity1685910956033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stuffs" ("stuffId" uuid NOT NULL DEFAULT uuid_generate_v4(), "stuffName" character varying NOT NULL, "stuffDescription" character varying, "stuffPacking" character varying, "stuffPerPacking" character varying, "measurementUnit" character varying NOT NULL, "minimumStock" character varying, "idealStock" character varying, "supplierId" uuid, "purchaseId" uuid, "companyCode" character varying, CONSTRAINT "PK_e549ca0bffc468837a660dd76b9" PRIMARY KEY ("stuffId"))`);
        await queryRunner.query(`ALTER TABLE "stuffs" ADD CONSTRAINT "FK_3f72aa076ebb0c05b7f5761bbd8" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("supplierId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stuffs" ADD CONSTRAINT "FK_449837bac3f8704ceff905009e2" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("purchaseId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stuffs" ADD CONSTRAINT "FK_08f68d40d19c0fcf2c3dbff20a3" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuffs" DROP CONSTRAINT "FK_08f68d40d19c0fcf2c3dbff20a3"`);
        await queryRunner.query(`ALTER TABLE "stuffs" DROP CONSTRAINT "FK_449837bac3f8704ceff905009e2"`);
        await queryRunner.query(`ALTER TABLE "stuffs" DROP CONSTRAINT "FK_3f72aa076ebb0c05b7f5761bbd8"`);
        await queryRunner.query(`DROP TABLE "stuffs"`);
    }

}
