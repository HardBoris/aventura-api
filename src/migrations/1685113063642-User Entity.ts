import { MigrationInterface, QueryRunner } from "typeorm";
import { hashSync } from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

export class UserEntity1685113063642 implements MigrationInterface {
  name = "UserEntity1685113063642";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "userPassword" character varying NOT NULL, "userCategory" "public"."users_usercategory_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyCode" character varying NOT NULL, CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_ee667b3d74d8a351a3a9903ef3d" FOREIGN KEY ("companyCode") REFERENCES "companies"("companyCode") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`
                INSERT INTO "users" ("userName", "userCategory", "companyCode", "userPassword")
                VALUES ('${
                  process.env.OWNER_NAME
                }', 'owner', '000000', '${hashSync(
      process.env.OWNER_PASSWORD,
      10
    )}')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_ee667b3d74d8a351a3a9903ef3d"`
    );
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
