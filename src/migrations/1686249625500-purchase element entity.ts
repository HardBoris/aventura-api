import { MigrationInterface, QueryRunner } from "typeorm";

export class PurchaseElementEntity1686249625500 implements MigrationInterface {
    name = 'PurchaseElementEntity1686249625500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchase_elements" ("elementId" uuid NOT NULL DEFAULT uuid_generate_v4(), "element" character varying NOT NULL, "quantity" double precision NOT NULL, "unit" character varying NOT NULL, "cost" double precision NOT NULL, "midiaId" uuid, "stuffId" uuid, "toolId" uuid, "purchaseId" uuid, "companyCode" character varying, CONSTRAINT "PK_1ea79ec1174461aea4ce0ab9d15" PRIMARY KEY ("elementId"))`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD CONSTRAINT "FK_a5f52bf07b0c347a9f0fdcae5dc" FOREIGN KEY ("midiaId") REFERENCES "midias"("midiaId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD CONSTRAINT "FK_dca2bdfc2b82fcefefc159525cf" FOREIGN KEY ("stuffId") REFERENCES "stuffs"("stuffId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD CONSTRAINT "FK_7a769ab359d36b364d5947903eb" FOREIGN KEY ("toolId") REFERENCES "tools"("toolId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD CONSTRAINT "FK_7cd811aa5a5be73dcbf348de9f2" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("purchaseId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD CONSTRAINT "FK_f20ead7040f73a918c4cff018b2" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP CONSTRAINT "FK_f20ead7040f73a918c4cff018b2"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP CONSTRAINT "FK_7cd811aa5a5be73dcbf348de9f2"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP CONSTRAINT "FK_7a769ab359d36b364d5947903eb"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP CONSTRAINT "FK_dca2bdfc2b82fcefefc159525cf"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP CONSTRAINT "FK_a5f52bf07b0c347a9f0fdcae5dc"`);
        await queryRunner.query(`DROP TABLE "purchase_elements"`);
    }

}
