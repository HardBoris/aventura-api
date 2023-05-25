import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyEntity1684981370870 implements MigrationInterface {
  name = "CompanyEntity1684981370870";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "companies" ("companyId" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyName" character varying, "companyEmail" character varying NOT NULL, "companyCode" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_89c6967fd03128e11e33e1bd778" UNIQUE ("companyEmail"), CONSTRAINT "UQ_b802fadb7919d21223f6cd5b80a" UNIQUE ("companyCode"), CONSTRAINT "PK_9de34f59e8578db786054269261" PRIMARY KEY ("companyId"))`
    );
    await queryRunner.query(`
                INSERT INTO "companies" ("companyName", "companyEmail", "companyCode")
                VALUES ('${process.env.COMPANY_NAME}', '${process.env.COMPANY_EMAIL}', '000000')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "companies"`);
  }
}
