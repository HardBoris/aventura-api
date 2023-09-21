import { MigrationInterface, QueryRunner } from "typeorm";

export class StuffEntity1695328409479 implements MigrationInterface {
  name = "StuffEntity1695328409479";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stuffs" DROP CONSTRAINT "FK_a3e17336735a1517130127789ae" CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "stuffs" DROP CONSTRAINT "PK_e549ca0bffc468837a660dd76b9" CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "stuffs" DROP COLUMN "stuffId"`);
    await queryRunner.query(`ALTER TABLE "stuffs" DROP COLUMN "categoryId"`);
    await queryRunner.query(`ALTER TABLE "stuffs" DROP COLUMN "stuff"`);
    await queryRunner.query(`ALTER TABLE "stuffs" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "stuffs" DROP COLUMN "defaultUnit"`);
    await queryRunner.query(
      `ALTER TABLE "stuffs" ADD "stuffProfileId" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "stuffs" ADD CONSTRAINT "PK_c7ed665469fbfcc71d7e0af6974" PRIMARY KEY ("stuffProfileId")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stuffs" DROP CONSTRAINT "PK_c7ed665469fbfcc71d7e0af6974"`
    );
    await queryRunner.query(
      `ALTER TABLE "stuffs" DROP COLUMN "stuffProfileId"`
    );
    await queryRunner.query(
      `ALTER TABLE "stuffs" ADD "defaultUnit" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "stuffs" ADD "description" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "stuffs" ADD "stuff" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "stuffs" ADD "categoryId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "stuffs" ADD "stuffId" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "stuffs" ADD CONSTRAINT "PK_e549ca0bffc468837a660dd76b9" PRIMARY KEY ("stuffId")`
    );
    await queryRunner.query(
      `ALTER TABLE "stuffs" ADD CONSTRAINT "FK_a3e17336735a1517130127789ae" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
