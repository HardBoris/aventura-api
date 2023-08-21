import { MigrationInterface, QueryRunner } from "typeorm";
import { hashSync } from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

export class InsertUserCompany1692641354498 implements MigrationInterface {
  name = "InsertUserCompany1692641354498";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                INSERT INTO "companies" ("companyName", "companyEmail", "code")
                VALUES ('${process.env.COMPANY_NAME}', '${process.env.COMPANY_EMAIL}', '000000')
        `);

    await queryRunner.query(`
                INSERT INTO "users" ("name", "userCategory", "companyCode", "password")
                VALUES ('${
                  process.env.OWNER_NAME
                }', 'owner', '000000', '${hashSync(
      process.env.OWNER_PASSWORD,
      10
    )}')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
