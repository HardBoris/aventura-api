import { MigrationInterface, QueryRunner } from "typeorm";

export class Details1695332743108 implements MigrationInterface {
    name = 'Details1695332743108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP CONSTRAINT "FK_7cd811aa5a5be73dcbf348de9f2"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP COLUMN "purchaseId"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD "prequestId" integer`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD "elementId" uuid`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD "prequest" integer`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "UQ_08d943d832eb67683ae82268805" UNIQUE ("prequest")`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD CONSTRAINT "FK_1f9ce286ec26dc45fbd6be468a1" FOREIGN KEY ("prequestId") REFERENCES "purchase_requests"("prId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD CONSTRAINT "FK_1ea79ec1174461aea4ce0ab9d15" FOREIGN KEY ("elementId") REFERENCES "elements"("elementId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_08d943d832eb67683ae82268805" FOREIGN KEY ("prequest") REFERENCES "purchase_requests"("prId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_08d943d832eb67683ae82268805"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP CONSTRAINT "FK_1ea79ec1174461aea4ce0ab9d15"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP CONSTRAINT "FK_1f9ce286ec26dc45fbd6be468a1"`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "UQ_08d943d832eb67683ae82268805"`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "prequest"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP COLUMN "elementId"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" DROP COLUMN "prequestId"`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD "purchaseId" integer`);
        await queryRunner.query(`ALTER TABLE "purchase_elements" ADD CONSTRAINT "FK_7cd811aa5a5be73dcbf348de9f2" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("purchaseId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
