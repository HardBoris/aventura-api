import { MigrationInterface, QueryRunner } from "typeorm";

export class SuppliersEntity1685277255547 implements MigrationInterface {
    name = 'SuppliersEntity1685277255547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "suppliers" ("supplierId" uuid NOT NULL DEFAULT uuid_generate_v4(), "supplierName" character varying NOT NULL, "supplierCNPJ" character varying NOT NULL, "supplierCorporateName" character varying, "supplierEmail" character varying, "supplierPhone" character varying, "companyCode" character varying, CONSTRAINT "UQ_77753e0b72948ed0cbd0799bc2f" UNIQUE ("supplierCNPJ"), CONSTRAINT "PK_72715ca349897fe61381e321009" PRIMARY KEY ("supplierId"))`);
        await queryRunner.query(`ALTER TYPE "public"."users_usercategory_enum" RENAME TO "users_usercategory_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_usercategory_enum" AS ENUM('owner', 'admin', 'buyer', 'inventory', 'overseer', 'user')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "userCategory" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "userCategory" TYPE "public"."users_usercategory_enum" USING "userCategory"::"text"::"public"."users_usercategory_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "userCategory" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."users_usercategory_enum_old"`);
        await queryRunner.query(`ALTER TABLE "suppliers" ADD CONSTRAINT "FK_c3a4207c885bed79d6a2699f576" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "suppliers" DROP CONSTRAINT "FK_c3a4207c885bed79d6a2699f576"`);
        await queryRunner.query(`CREATE TYPE "public"."users_usercategory_enum_old" AS ENUM('admin', 'owner', 'buyer', 'store', 'overseer', 'user')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "userCategory" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "userCategory" TYPE "public"."users_usercategory_enum_old" USING "userCategory"::"text"::"public"."users_usercategory_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "userCategory" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."users_usercategory_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_usercategory_enum_old" RENAME TO "users_usercategory_enum"`);
        await queryRunner.query(`DROP TABLE "suppliers"`);
    }

}
