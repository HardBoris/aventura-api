import { MigrationInterface, QueryRunner } from "typeorm";

export class ElementEntity1695330099812 implements MigrationInterface {
    name = 'ElementEntity1695330099812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "elements" ("elementId" uuid NOT NULL DEFAULT uuid_generate_v4(), "element" character varying NOT NULL, "description" character varying, "elementType" character varying NOT NULL, "defaultUnit" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "stuffProfileId" uuid, CONSTRAINT "REL_679c30e92a3e5d3176103bad15" UNIQUE ("stuffProfileId"), CONSTRAINT "PK_2859c49f0fdd663ed7ac046a8ba" PRIMARY KEY ("elementId"))`);
        await queryRunner.query(`CREATE TABLE "partners_element_elements" ("partnersPartnerId" uuid NOT NULL, "elementsElementId" uuid NOT NULL, CONSTRAINT "PK_5af02d8c155da55105d52f440a0" PRIMARY KEY ("partnersPartnerId", "elementsElementId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0891aa36739a6d14f930aaf36e" ON "partners_element_elements" ("partnersPartnerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7b46d435433db44f4b9188aa0d" ON "partners_element_elements" ("elementsElementId") `);
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP COLUMN "stuffId"`);
        await queryRunner.query(`ALTER TABLE "elements" ADD CONSTRAINT "FK_679c30e92a3e5d3176103bad15d" FOREIGN KEY ("stuffProfileId") REFERENCES "stuffs"("stuffProfileId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "partners_element_elements" ADD CONSTRAINT "FK_0891aa36739a6d14f930aaf36e5" FOREIGN KEY ("partnersPartnerId") REFERENCES "partners"("partnerId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "partners_element_elements" ADD CONSTRAINT "FK_7b46d435433db44f4b9188aa0d4" FOREIGN KEY ("elementsElementId") REFERENCES "elements"("elementId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partners_element_elements" DROP CONSTRAINT "FK_7b46d435433db44f4b9188aa0d4"`);
        await queryRunner.query(`ALTER TABLE "partners_element_elements" DROP CONSTRAINT "FK_0891aa36739a6d14f930aaf36e5"`);
        await queryRunner.query(`ALTER TABLE "elements" DROP CONSTRAINT "FK_679c30e92a3e5d3176103bad15d"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD "stuffId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7b46d435433db44f4b9188aa0d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0891aa36739a6d14f930aaf36e"`);
        await queryRunner.query(`DROP TABLE "partners_element_elements"`);
        await queryRunner.query(`DROP TABLE "elements"`);
    }

}
