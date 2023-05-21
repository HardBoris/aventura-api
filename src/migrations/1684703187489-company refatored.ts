import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyRefatored1684703187489 implements MigrationInterface {
    name = 'CompanyRefatored1684703187489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "UQ_b802fadb7919d21223f6cd5b80a" UNIQUE ("companyCode")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "UQ_b802fadb7919d21223f6cd5b80a"`);
    }

}
