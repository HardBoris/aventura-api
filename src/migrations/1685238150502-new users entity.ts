import { MigrationInterface, QueryRunner } from "typeorm";
import { hashSync } from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

export class NewUsersEntity1685238150502 implements MigrationInterface {
  name = "NewUsersEntity1685238150502";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "companies" RENAME COLUMN "companyCode" TO "code"`
    );
    await queryRunner.query(
      `ALTER TABLE "companies" RENAME CONSTRAINT "UQ_b802fadb7919d21223f6cd5b80a" TO "UQ_80af3e6808151c3210b4d5a2185"`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "userPassword" character varying NOT NULL, "userCategory" "public"."users_usercategory_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyCode" character varying, CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_992ae1eac1cc7f3f700b088009d" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE "users" DROP CONSTRAINT "FK_992ae1eac1cc7f3f700b088009d"`
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(
      `ALTER TABLE "companies" RENAME CONSTRAINT "UQ_80af3e6808151c3210b4d5a2185" TO "UQ_b802fadb7919d21223f6cd5b80a"`
    );
    await queryRunner.query(
      `ALTER TABLE "companies" RENAME COLUMN "code" TO "companyCode"`
    );
  }
}
