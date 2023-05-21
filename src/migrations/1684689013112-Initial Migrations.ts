import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrations1684689013112 implements MigrationInterface {
    name = 'InitialMigrations1684689013112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "suppliers" ("supplierId" uuid NOT NULL DEFAULT uuid_generate_v4(), "supplierName" character varying NOT NULL, "supplierCNPJ" character varying NOT NULL, "supplierCorporateName" character varying, "supplierEmail" character varying, "supplierPhone" character varying, "companyId" uuid, CONSTRAINT "UQ_77753e0b72948ed0cbd0799bc2f" UNIQUE ("supplierCNPJ"), CONSTRAINT "PK_72715ca349897fe61381e321009" PRIMARY KEY ("supplierId"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_usercategory_enum" AS ENUM('admin', 'owner', 'buyer', 'store', 'overseer', 'user')`);
        await queryRunner.query(`CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "userEmail" character varying, "userPassword" character varying NOT NULL, "userCategory" "public"."users_usercategory_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" uuid, CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("companyId" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyName" character varying, "companyEmail" character varying NOT NULL, "companyCode" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_89c6967fd03128e11e33e1bd778" UNIQUE ("companyEmail"), CONSTRAINT "PK_9de34f59e8578db786054269261" PRIMARY KEY ("companyId"))`);
        await queryRunner.query(`ALTER TABLE "suppliers" ADD CONSTRAINT "FK_a16f3c2e9b291abc6790e9822ae" FOREIGN KEY ("companyId") REFERENCES "companies"("companyId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6f9395c9037632a31107c8a9e58" FOREIGN KEY ("companyId") REFERENCES "companies"("companyId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6f9395c9037632a31107c8a9e58"`);
        await queryRunner.query(`ALTER TABLE "suppliers" DROP CONSTRAINT "FK_a16f3c2e9b291abc6790e9822ae"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_usercategory_enum"`);
        await queryRunner.query(`DROP TABLE "suppliers"`);
    }

}
