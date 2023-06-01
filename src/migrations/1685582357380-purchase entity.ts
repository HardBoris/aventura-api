import { MigrationInterface, QueryRunner } from "typeorm";

export class PurchaseEntity1685582357380 implements MigrationInterface {
    name = 'PurchaseEntity1685582357380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."purchases_logisticmode_enum" AS ENUM('Entrega', 'Retirada')`);
        await queryRunner.query(`CREATE TYPE "public"."purchases_paymentform_enum" AS ENUM('Faturado', 'Cartão', 'A vista')`);
        await queryRunner.query(`CREATE TYPE "public"."purchases_paymentinstallments_enum" AS ENUM('1X', '2X', '3X', 'Pix', 'Dinheiro')`);
        await queryRunner.query(`CREATE TYPE "public"."purchases_purchasestatus_enum" AS ENUM('Ok', 'Pendente', 'Atrasada')`);
        await queryRunner.query(`CREATE TABLE "purchases" ("purchaseId" uuid NOT NULL DEFAULT uuid_generate_v4(), "purchaseDate" TIMESTAMP NOT NULL DEFAULT now(), "purchaseReference" character varying, "deliveryDate" TIMESTAMP NOT NULL, "logisticMode" "public"."purchases_logisticmode_enum" NOT NULL DEFAULT 'Entrega', "paymentForm" "public"."purchases_paymentform_enum" NOT NULL DEFAULT 'Faturado', "paymentInstallments" "public"."purchases_paymentinstallments_enum" NOT NULL DEFAULT '3X', "purchaseStatus" "public"."purchases_purchasestatus_enum" NOT NULL DEFAULT 'Pendente', "supplierId" uuid, "companyCode" character varying, CONSTRAINT "PK_611866f7af176a877f97cbb76a4" PRIMARY KEY ("purchaseId"))`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_77980c752fdeb3689e318fde424" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("supplierId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_1650274d28069abce100aa9d9e1" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_1650274d28069abce100aa9d9e1"`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_77980c752fdeb3689e318fde424"`);
        await queryRunner.query(`DROP TABLE "purchases"`);
        await queryRunner.query(`DROP TYPE "public"."purchases_purchasestatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."purchases_paymentinstallments_enum"`);
        await queryRunner.query(`DROP TYPE "public"."purchases_paymentform_enum"`);
        await queryRunner.query(`DROP TYPE "public"."purchases_logisticmode_enum"`);
    }

}
