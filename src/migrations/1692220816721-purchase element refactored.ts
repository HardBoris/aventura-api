import { MigrationInterface, QueryRunner } from "typeorm";

export class PurchaseElementRefactored1692220816721 implements MigrationInterface {
    name = 'PurchaseElementRefactored1692220816721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stuffs" DROP COLUMN "stuffName"`);
        await queryRunner.query(`ALTER TABLE "stuffs" DROP COLUMN "stuffDescription"`);
        await queryRunner.query(`ALTER TABLE "stuffs" DROP COLUMN "measurementUnit"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP CONSTRAINT "PK_1ea79ec1174461aea4ce0ab9d15"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP COLUMN "elementId"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP COLUMN "element"`);
        await queryRunner.query(`ALTER TABLE "stuffs" ADD "stuff" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stuffs" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "stuffs" ADD "defaultUnit" character varying`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD "itemId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD CONSTRAINT "PK_13744622e19552eec87bf0aaddf" PRIMARY KEY ("itemId")`);
        await queryRunner.query(`ALTER TYPE "public"."purchases_paymentform_enum" RENAME TO "purchases_paymentform_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."purchases_paymentform_enum" AS ENUM('Faturado', 'Cartão', 'Dinheiro')`);
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "paymentForm" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "paymentForm" TYPE "public"."purchases_paymentform_enum" USING "paymentForm"::"text"::"public"."purchases_paymentform_enum"`);
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "paymentForm" SET DEFAULT 'Faturado'`);
        await queryRunner.query(`DROP TYPE "public"."purchases_paymentform_enum_old"`);
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "paymentInstallments" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "paymentInstallments" SET NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."purchases_paymentform_enum_old" AS ENUM('Faturado', 'Cartão', 'A vista')`);
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "paymentForm" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "paymentForm" TYPE "public"."purchases_paymentform_enum_old" USING "paymentForm"::"text"::"public"."purchases_paymentform_enum_old"`);
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "paymentForm" SET DEFAULT 'Faturado'`);
        await queryRunner.query(`DROP TYPE "public"."purchases_paymentform_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."purchases_paymentform_enum_old" RENAME TO "purchases_paymentform_enum"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP CONSTRAINT "PK_13744622e19552eec87bf0aaddf"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP COLUMN "itemId"`);
        await queryRunner.query(`ALTER TABLE "stuffs" DROP COLUMN "defaultUnit"`);
        await queryRunner.query(`ALTER TABLE "stuffs" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "stuffs" DROP COLUMN "stuff"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD "element" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD "elementId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD CONSTRAINT "PK_1ea79ec1174461aea4ce0ab9d15" PRIMARY KEY ("elementId")`);
        await queryRunner.query(`ALTER TABLE "stuffs" ADD "measurementUnit" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stuffs" ADD "stuffDescription" character varying`);
        await queryRunner.query(`ALTER TABLE "stuffs" ADD "stuffName" character varying NOT NULL`);
    }

}
