import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryEntity1686184369465 implements MigrationInterface {
    name = 'CategoryEntity1686184369465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("categoryId" uuid NOT NULL DEFAULT uuid_generate_v4(), "category" character varying NOT NULL, "companyCode" character varying, CONSTRAINT "PK_c9594c262e6781893a1068d91be" PRIMARY KEY ("categoryId"))`);
        await queryRunner.query(`ALTER TABLE "midias" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "stuffs" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "midias" ADD CONSTRAINT "FK_4394121950bbb78586a4f01aa44" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_c6b937895edd7b8ca6c129caf3e" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stuffs" ADD CONSTRAINT "FK_a3e17336735a1517130127789ae" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuffs" DROP CONSTRAINT "FK_a3e17336735a1517130127789ae"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_c6b937895edd7b8ca6c129caf3e"`);
        await queryRunner.query(`ALTER TABLE "midias" DROP CONSTRAINT "FK_4394121950bbb78586a4f01aa44"`);
        await queryRunner.query(`ALTER TABLE "stuffs" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "midias" DROP COLUMN "categoryId"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
