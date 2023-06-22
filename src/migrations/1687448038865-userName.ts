import { MigrationInterface, QueryRunner } from "typeorm";

export class UserName1687448038865 implements MigrationInterface {
    name = 'UserName1687448038865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName")`);
    }

}
