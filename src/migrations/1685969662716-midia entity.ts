import { MigrationInterface, QueryRunner } from "typeorm";

export class MidiaEntity1685969662716 implements MigrationInterface {
    name = 'MidiaEntity1685969662716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "midias" ("midiaId" uuid NOT NULL DEFAULT uuid_generate_v4(), "midiaName" character varying NOT NULL, "midiaDescription" character varying, "midiaWidth" character varying, "midiaHeight" character varying, "midiaThick" character varying, "measurementUnit" character varying NOT NULL, "minimumStock" character varying, "idealStock" character varying, "supplierId" uuid, "purchaseId" uuid, "companyCode" character varying, CONSTRAINT "PK_053c91074ae59d39f3c6f378ff3" PRIMARY KEY ("midiaId"))`);
        await queryRunner.query(`ALTER TABLE "midias" ADD CONSTRAINT "FK_ffe465ebc5dbb8f56e42f4f8af5" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("supplierId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "midias" ADD CONSTRAINT "FK_c96da825deff6017ea8d7151c7e" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("purchaseId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "midias" ADD CONSTRAINT "FK_6686b6e4c33a4b2ed857944fc93" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "midias" DROP CONSTRAINT "FK_6686b6e4c33a4b2ed857944fc93"`);
        await queryRunner.query(`ALTER TABLE "midias" DROP CONSTRAINT "FK_c96da825deff6017ea8d7151c7e"`);
        await queryRunner.query(`ALTER TABLE "midias" DROP CONSTRAINT "FK_ffe465ebc5dbb8f56e42f4f8af5"`);
        await queryRunner.query(`DROP TABLE "midias"`);
    }

}
