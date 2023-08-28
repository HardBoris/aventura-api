import { MigrationInterface, QueryRunner } from "typeorm";

export class MeasurementUnit1693236923949 implements MigrationInterface {
    name = 'MeasurementUnit1693236923949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "midias" ALTER COLUMN "measurementUnit" DROP NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."purchases_paymentform_enum" RENAME TO "purchases_paymentform_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."purchases_paymentform_enum" AS ENUM('Faturado', 'Cartão', 'Dinheiro')`);
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "paymentForm" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "paymentForm" TYPE "public"."purchases_paymentform_enum" USING "paymentForm"::"text"::"public"."purchases_paymentform_enum"`);
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "paymentForm" SET DEFAULT 'Faturado'`);
        await queryRunner.query(`DROP TYPE "public"."purchases_paymentform_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."purchases_paymentform_enum_old" AS ENUM('Faturado', 'Cartão', 'A vista')`);
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "paymentForm" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "paymentForm" TYPE "public"."purchases_paymentform_enum_old" USING "paymentForm"::"text"::"public"."purchases_paymentform_enum_old"`);
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "paymentForm" SET DEFAULT 'Faturado'`);
        await queryRunner.query(`DROP TYPE "public"."purchases_paymentform_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."purchases_paymentform_enum_old" RENAME TO "purchases_paymentform_enum"`);
        await queryRunner.query(`ALTER TABLE "midias" ALTER COLUMN "measurementUnit" SET NOT NULL`);
    }

}
