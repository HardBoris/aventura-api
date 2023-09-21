import { MigrationInterface, QueryRunner } from "typeorm";

export class PurchaseRequestEntity1695327636274 implements MigrationInterface {
    name = 'PurchaseRequestEntity1695327636274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchase_requests" ("prId" SERIAL NOT NULL, "prDate" TIMESTAMP NOT NULL DEFAULT now(), "requestorUserId" uuid, CONSTRAINT "PK_7be1aa75bc0c24fca59b16cdd26" PRIMARY KEY ("prId"))`);
        await queryRunner.query(`ALTER TABLE "purchase_requests" ADD CONSTRAINT "FK_d1142417e6b5acfa5d44c37741f" FOREIGN KEY ("requestorUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_requests" DROP CONSTRAINT "FK_d1142417e6b5acfa5d44c37741f"`);
        await queryRunner.query(`DROP TABLE "purchase_requests"`);
    }

}
