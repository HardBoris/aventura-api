import { MigrationInterface, QueryRunner } from "typeorm";

export class ToolEntity1695331627195 implements MigrationInterface {
  name = "ToolEntity1695331627195";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" DROP CONSTRAINT "FK_7a769ab359d36b364d5947903eb" CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "tools" DROP CONSTRAINT "FK_04c976b34f552aaeba3dd5e332a" CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" DROP COLUMN "toolId"`
    );
    await queryRunner.query(
      `ALTER TABLE "tools" DROP CONSTRAINT "PK_6681b0db33622268f0b5c855e62" CASCADE`
    );
    await queryRunner.query(`ALTER TABLE "tools" DROP COLUMN "toolId"`);
    await queryRunner.query(`ALTER TABLE "tools" DROP COLUMN "categoryId"`);
    await queryRunner.query(`ALTER TABLE "tools" DROP COLUMN "tool"`);
    await queryRunner.query(
      `ALTER TABLE "tools" ADD "toolProfileId" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "tools" ADD CONSTRAINT "PK_0846405f79329d0234a490ce825" PRIMARY KEY ("toolProfileId")`
    );
    await queryRunner.query(`ALTER TABLE "elements" ADD "toolProfileId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "elements" ADD CONSTRAINT "UQ_b9dcd81d0acae393b8b067d0456" UNIQUE ("toolProfileId")`
    );
    await queryRunner.query(
      `ALTER TABLE "elements" ADD CONSTRAINT "FK_b9dcd81d0acae393b8b067d0456" FOREIGN KEY ("toolProfileId") REFERENCES "tools"("toolProfileId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "elements" DROP CONSTRAINT "FK_b9dcd81d0acae393b8b067d0456"`
    );
    await queryRunner.query(
      `ALTER TABLE "elements" DROP CONSTRAINT "UQ_b9dcd81d0acae393b8b067d0456"`
    );
    await queryRunner.query(
      `ALTER TABLE "elements" DROP COLUMN "toolProfileId"`
    );
    await queryRunner.query(
      `ALTER TABLE "tools" DROP CONSTRAINT "PK_0846405f79329d0234a490ce825"`
    );
    await queryRunner.query(`ALTER TABLE "tools" DROP COLUMN "toolProfileId"`);
    await queryRunner.query(
      `ALTER TABLE "tools" ADD "tool" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "tools" ADD "categoryId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tools" ADD "toolId" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "tools" ADD CONSTRAINT "PK_6681b0db33622268f0b5c855e62" PRIMARY KEY ("toolId")`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" ADD "toolId" uuid`
    );
    await queryRunner.query(
      `ALTER TABLE "tools" ADD CONSTRAINT "FK_04c976b34f552aaeba3dd5e332a" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" ADD CONSTRAINT "FK_7a769ab359d36b364d5947903eb" FOREIGN KEY ("toolId") REFERENCES "tools"("toolId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
