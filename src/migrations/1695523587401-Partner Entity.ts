import { MigrationInterface, QueryRunner } from "typeorm";

export class PartnerEntity1695523587401 implements MigrationInterface {
    name = 'PartnerEntity1695523587401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "partners_elements_elements" ("partnersPartnerId" uuid NOT NULL, "elementsElementId" uuid NOT NULL, CONSTRAINT "PK_2fcd2cde56bdf20ff530805c86b" PRIMARY KEY ("partnersPartnerId", "elementsElementId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_10c1d52c7f39f9a8d6db9b2364" ON "partners_elements_elements" ("partnersPartnerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b77a4e69dc0a71ece15b28b270" ON "partners_elements_elements" ("elementsElementId") `);
        await queryRunner.query(`ALTER TABLE "partners_elements_elements" ADD CONSTRAINT "FK_10c1d52c7f39f9a8d6db9b23645" FOREIGN KEY ("partnersPartnerId") REFERENCES "partners"("partnerId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "partners_elements_elements" ADD CONSTRAINT "FK_b77a4e69dc0a71ece15b28b2701" FOREIGN KEY ("elementsElementId") REFERENCES "elements"("elementId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partners_elements_elements" DROP CONSTRAINT "FK_b77a4e69dc0a71ece15b28b2701"`);
        await queryRunner.query(`ALTER TABLE "partners_elements_elements" DROP CONSTRAINT "FK_10c1d52c7f39f9a8d6db9b23645"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b77a4e69dc0a71ece15b28b270"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10c1d52c7f39f9a8d6db9b2364"`);
        await queryRunner.query(`DROP TABLE "partners_elements_elements"`);
    }

}
