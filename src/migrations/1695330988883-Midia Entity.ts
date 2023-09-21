import { MigrationInterface, QueryRunner } from "typeorm";

export class MidiaEntity1695330988883 implements MigrationInterface {
  name = "MidiaEntity1695330988883";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" DROP CONSTRAINT "FK_a5f52bf07b0c347a9f0fdcae5dc"`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" DROP CONSTRAINT "FK_4394121950bbb78586a4f01aa44"`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" DROP COLUMN "midiaId"`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" DROP CONSTRAINT "PK_053c91074ae59d39f3c6f378ff3" CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "midias" DROP COLUMN "midiaId"`);
    await queryRunner.query(`ALTER TABLE "midias" DROP COLUMN "categoryId"`);
    await queryRunner.query(`ALTER TABLE "midias" DROP COLUMN "midiaName"`);
    await queryRunner.query(
      `ALTER TABLE "midias" DROP COLUMN "midiaDescription"`
    );
    await queryRunner.query(`ALTER TABLE "midias" DROP COLUMN "midiaWidth"`);
    await queryRunner.query(`ALTER TABLE "midias" DROP COLUMN "midiaHeight"`);
    await queryRunner.query(`ALTER TABLE "midias" DROP COLUMN "midiaThick"`);
    await queryRunner.query(
      `ALTER TABLE "midias" DROP COLUMN "measurementUnit"`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" ADD "midiaProfileId" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" ADD CONSTRAINT "PK_69e461f1aa558667b000256319f" PRIMARY KEY ("midiaProfileId")`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" ADD "width" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" ADD "height" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" ADD "thick" character varying`
    );
    await queryRunner.query(`ALTER TABLE "elements" ADD "midiaProfileId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "elements" ADD CONSTRAINT "UQ_bea03a3416d4c5de2463f6e5d99" UNIQUE ("midiaProfileId")`
    );
    await queryRunner.query(
      `ALTER TABLE "elements" ADD "companyCode" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "elements" ADD CONSTRAINT "FK_bea03a3416d4c5de2463f6e5d99" FOREIGN KEY ("midiaProfileId") REFERENCES "midias"("midiaProfileId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "elements" ADD CONSTRAINT "FK_c38579c2d60f4157e7137a08484" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "elements" DROP CONSTRAINT "FK_c38579c2d60f4157e7137a08484"`
    );
    await queryRunner.query(
      `ALTER TABLE "elements" DROP CONSTRAINT "FK_bea03a3416d4c5de2463f6e5d99"`
    );
    await queryRunner.query(`ALTER TABLE "elements" DROP COLUMN "companyCode"`);
    await queryRunner.query(
      `ALTER TABLE "elements" DROP CONSTRAINT "UQ_bea03a3416d4c5de2463f6e5d99"`
    );
    await queryRunner.query(
      `ALTER TABLE "elements" DROP COLUMN "midiaProfileId"`
    );
    await queryRunner.query(`ALTER TABLE "midias" DROP COLUMN "thick"`);
    await queryRunner.query(`ALTER TABLE "midias" DROP COLUMN "height"`);
    await queryRunner.query(`ALTER TABLE "midias" DROP COLUMN "width"`);
    await queryRunner.query(
      `ALTER TABLE "midias" DROP CONSTRAINT "PK_69e461f1aa558667b000256319f"`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" DROP COLUMN "midiaProfileId"`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" ADD "measurementUnit" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" ADD "midiaThick" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" ADD "midiaHeight" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" ADD "midiaWidth" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" ADD "midiaDescription" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" ADD "midiaName" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "midias" ADD "categoryId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "midias" ADD "midiaId" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" ADD CONSTRAINT "PK_053c91074ae59d39f3c6f378ff3" PRIMARY KEY ("midiaId")`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" ADD "midiaId" uuid`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" ADD CONSTRAINT "FK_4394121950bbb78586a4f01aa44" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" ADD CONSTRAINT "FK_a5f52bf07b0c347a9f0fdcae5dc" FOREIGN KEY ("midiaId") REFERENCES "midias"("midiaId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
