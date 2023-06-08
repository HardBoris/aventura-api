import { MigrationInterface, QueryRunner } from "typeorm";

export class ToolEntity1686231625251 implements MigrationInterface {
    name = 'ToolEntity1686231625251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tools" ("toolId" uuid NOT NULL DEFAULT uuid_generate_v4(), "tool" character varying NOT NULL, "toolModel" character varying, "toolPower" character varying, "supplierId" uuid, "purchaseId" uuid, "categoryId" uuid, "companyCode" character varying, CONSTRAINT "PK_6681b0db33622268f0b5c855e62" PRIMARY KEY ("toolId"))`);
        await queryRunner.query(`ALTER TABLE "tools" ADD CONSTRAINT "FK_017a317faeda4bace42b8707032" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("supplierId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tools" ADD CONSTRAINT "FK_fa96f97ccfc492414ba8beadb5e" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("purchaseId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tools" ADD CONSTRAINT "FK_04c976b34f552aaeba3dd5e332a" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tools" ADD CONSTRAINT "FK_5f396e6cb7ecf1230911cb0ed24" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tools" DROP CONSTRAINT "FK_5f396e6cb7ecf1230911cb0ed24"`);
        await queryRunner.query(`ALTER TABLE "tools" DROP CONSTRAINT "FK_04c976b34f552aaeba3dd5e332a"`);
        await queryRunner.query(`ALTER TABLE "tools" DROP CONSTRAINT "FK_fa96f97ccfc492414ba8beadb5e"`);
        await queryRunner.query(`ALTER TABLE "tools" DROP CONSTRAINT "FK_017a317faeda4bace42b8707032"`);
        await queryRunner.query(`DROP TABLE "tools"`);
    }

}
