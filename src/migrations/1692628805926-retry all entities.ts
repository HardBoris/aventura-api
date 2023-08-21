import { MigrationInterface, QueryRunner } from "typeorm";
import { hashSync } from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

export class RetryAllEntities1692628805926 implements MigrationInterface {
  name = "RetryAllEntities1692628805926";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "service_orders" ("serviceOrderId" SERIAL NOT NULL, "order" character varying NOT NULL, "companyCode" character varying, CONSTRAINT "PK_df0b6205a489f7ff21306e45a44" PRIMARY KEY ("serviceOrderId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "suppliers" ("supplierId" uuid NOT NULL DEFAULT uuid_generate_v4(), "supplierName" character varying NOT NULL, "supplierCNPJ" character varying NOT NULL, "supplierCorporateName" character varying, "supplierEmail" character varying, "supplierPhone" character varying, "companyCode" character varying, CONSTRAINT "PK_72715ca349897fe61381e321009" PRIMARY KEY ("supplierId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "stuffs" ("stuffId" uuid NOT NULL DEFAULT uuid_generate_v4(), "stuff" character varying NOT NULL, "description" character varying, "defaultUnit" character varying, "stuffPacking" character varying, "stuffPerPacking" character varying, "minimumStock" character varying, "idealStock" character varying, "categoryId" uuid, "companyCode" character varying, CONSTRAINT "PK_e549ca0bffc468837a660dd76b9" PRIMARY KEY ("stuffId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "midias" ("midiaId" uuid NOT NULL DEFAULT uuid_generate_v4(), "midiaName" character varying NOT NULL, "midiaDescription" character varying, "midiaWidth" character varying, "midiaHeight" character varying, "midiaThick" character varying, "measurementUnit" character varying NOT NULL, "minimumStock" character varying, "idealStock" character varying, "categoryId" uuid, "companyCode" character varying, CONSTRAINT "PK_053c91074ae59d39f3c6f378ff3" PRIMARY KEY ("midiaId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tools" ("toolId" uuid NOT NULL DEFAULT uuid_generate_v4(), "tool" character varying NOT NULL, "toolModel" character varying, "toolPower" character varying, "categoryId" uuid, "companyCode" character varying, CONSTRAINT "PK_6681b0db33622268f0b5c855e62" PRIMARY KEY ("toolId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "purchase_elements" ("itemId" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" double precision NOT NULL, "unit" character varying NOT NULL, "cost" double precision NOT NULL, "toolId" uuid, "stuffId" uuid, "midiaId" uuid, "purchaseId" integer, "companyCode" character varying, CONSTRAINT "PK_13744622e19552eec87bf0aaddf" PRIMARY KEY ("itemId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "purchases" ("purchaseId" SERIAL NOT NULL, "purchaseDate" TIMESTAMP NOT NULL DEFAULT now(), "invoice" character varying, "deliveryDate" TIMESTAMP, "logisticMode" "public"."purchases_logisticmode_enum" NOT NULL DEFAULT 'Entrega', "paymentForm" "public"."purchases_paymentform_enum" NOT NULL DEFAULT 'Faturado', "paymentInstallments" character varying, "purchaseStatus" "public"."purchases_purchasestatus_enum" NOT NULL DEFAULT 'Pendente', "supplierId" uuid, "companyCode" character varying, CONSTRAINT "PK_611866f7af176a877f97cbb76a4" PRIMARY KEY ("purchaseId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "password" character varying NOT NULL, "userCategory" "public"."users_usercategory_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyCode" character varying, CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "entries" ("entryId" SERIAL NOT NULL, "isReceived" boolean NOT NULL DEFAULT false, "entryDate" TIMESTAMP NOT NULL, "userId" uuid, "purchaseId" integer, "companyCode" character varying, CONSTRAINT "REL_d5c89d969d7812a95cabf03b77" UNIQUE ("purchaseId"), CONSTRAINT "PK_2dad521e106333678b91a290f58" PRIMARY KEY ("entryId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "movements" ("moveId" SERIAL NOT NULL, "moveType" character varying NOT NULL, "moveElement" character varying NOT NULL, "elementType" character varying NOT NULL, "moveQuantity" integer NOT NULL, "moveUnit" character varying NOT NULL, "requisitionId" integer, "entryId" integer, "companyCode" character varying, CONSTRAINT "PK_a4ae2cefa24e828e992ebce9863" PRIMARY KEY ("moveId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "requisitions" ("requestId" SERIAL NOT NULL, "isDelivered" boolean NOT NULL DEFAULT false, "requestDate" TIMESTAMP NOT NULL, "orderId" integer, "userId" uuid, "companyCode" character varying, CONSTRAINT "REL_b5544e9649899220f779ad3310" UNIQUE ("orderId"), CONSTRAINT "PK_f03e421171b3e8fc38f227286ed" PRIMARY KEY ("requestId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "companies" ("companyId" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyName" character varying, "companyEmail" character varying NOT NULL, "code" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_89c6967fd03128e11e33e1bd778" UNIQUE ("companyEmail"), CONSTRAINT "UQ_80af3e6808151c3210b4d5a2185" UNIQUE ("code"), CONSTRAINT "PK_9de34f59e8578db786054269261" PRIMARY KEY ("companyId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("categoryId" uuid NOT NULL DEFAULT uuid_generate_v4(), "category" character varying NOT NULL, "companyCode" character varying, CONSTRAINT "PK_c9594c262e6781893a1068d91be" PRIMARY KEY ("categoryId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "suppliers_stuffs_stuffs" ("suppliersSupplierId" uuid NOT NULL, "stuffsStuffId" uuid NOT NULL, CONSTRAINT "PK_7a2844b2b28ae8dc60a16ea864c" PRIMARY KEY ("suppliersSupplierId", "stuffsStuffId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0b59c78f881fb40c9317dad95e" ON "suppliers_stuffs_stuffs" ("suppliersSupplierId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0b1db66fd93c8bbbe54d4d4422" ON "suppliers_stuffs_stuffs" ("stuffsStuffId") `
    );
    await queryRunner.query(
      `CREATE TABLE "suppliers_midias_midias" ("suppliersSupplierId" uuid NOT NULL, "midiasMidiaId" uuid NOT NULL, CONSTRAINT "PK_8156cffc526ffcd082688884e40" PRIMARY KEY ("suppliersSupplierId", "midiasMidiaId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e73813e6ea27fb34c8eb0cc574" ON "suppliers_midias_midias" ("suppliersSupplierId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ad7db363f82a4c8a17c7e07298" ON "suppliers_midias_midias" ("midiasMidiaId") `
    );
    await queryRunner.query(
      `CREATE TABLE "suppliers_tools_tools" ("suppliersSupplierId" uuid NOT NULL, "toolsToolId" uuid NOT NULL, CONSTRAINT "PK_10619fe8466a462039003db44b6" PRIMARY KEY ("suppliersSupplierId", "toolsToolId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bf819602c50a95fa39b816bb2a" ON "suppliers_tools_tools" ("suppliersSupplierId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_05961f7a7240cbaf8b9e270120" ON "suppliers_tools_tools" ("toolsToolId") `
    );
    await queryRunner.query(
      `ALTER TABLE "service_orders" ADD CONSTRAINT "FK_c4735a4778698768ce85ac01a11" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers" ADD CONSTRAINT "FK_c3a4207c885bed79d6a2699f576" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "stuffs" ADD CONSTRAINT "FK_a3e17336735a1517130127789ae" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "stuffs" ADD CONSTRAINT "FK_08f68d40d19c0fcf2c3dbff20a3" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" ADD CONSTRAINT "FK_4394121950bbb78586a4f01aa44" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" ADD CONSTRAINT "FK_6686b6e4c33a4b2ed857944fc93" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tools" ADD CONSTRAINT "FK_04c976b34f552aaeba3dd5e332a" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tools" ADD CONSTRAINT "FK_5f396e6cb7ecf1230911cb0ed24" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" ADD CONSTRAINT "FK_7a769ab359d36b364d5947903eb" FOREIGN KEY ("toolId") REFERENCES "tools"("toolId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" ADD CONSTRAINT "FK_dca2bdfc2b82fcefefc159525cf" FOREIGN KEY ("stuffId") REFERENCES "stuffs"("stuffId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" ADD CONSTRAINT "FK_a5f52bf07b0c347a9f0fdcae5dc" FOREIGN KEY ("midiaId") REFERENCES "midias"("midiaId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" ADD CONSTRAINT "FK_7cd811aa5a5be73dcbf348de9f2" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("purchaseId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" ADD CONSTRAINT "FK_f20ead7040f73a918c4cff018b2" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "FK_77980c752fdeb3689e318fde424" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("supplierId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "FK_1650274d28069abce100aa9d9e1" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_992ae1eac1cc7f3f700b088009d" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ADD CONSTRAINT "FK_e186b0c87ddac0718d1f6783f98" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ADD CONSTRAINT "FK_d5c89d969d7812a95cabf03b777" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("purchaseId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ADD CONSTRAINT "FK_1149ff164f8c544ae1095fbaed5" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "movements" ADD CONSTRAINT "FK_a89ea49cb7f9f67e08281816057" FOREIGN KEY ("requisitionId") REFERENCES "requisitions"("requestId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "movements" ADD CONSTRAINT "FK_97106822000b986efc38bcaa018" FOREIGN KEY ("entryId") REFERENCES "entries"("entryId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "movements" ADD CONSTRAINT "FK_68a3ee95d3e84067e02a1c24d3a" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "requisitions" ADD CONSTRAINT "FK_b5544e9649899220f779ad33108" FOREIGN KEY ("orderId") REFERENCES "service_orders"("serviceOrderId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "requisitions" ADD CONSTRAINT "FK_905d5501a2c445cb8b7ffe470da" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "requisitions" ADD CONSTRAINT "FK_069669ffac52a6a94529782a363" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_c6b937895edd7b8ca6c129caf3e" FOREIGN KEY ("companyCode") REFERENCES "companies"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_stuffs_stuffs" ADD CONSTRAINT "FK_0b59c78f881fb40c9317dad95ee" FOREIGN KEY ("suppliersSupplierId") REFERENCES "suppliers"("supplierId") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_stuffs_stuffs" ADD CONSTRAINT "FK_0b1db66fd93c8bbbe54d4d44225" FOREIGN KEY ("stuffsStuffId") REFERENCES "stuffs"("stuffId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_midias_midias" ADD CONSTRAINT "FK_e73813e6ea27fb34c8eb0cc574c" FOREIGN KEY ("suppliersSupplierId") REFERENCES "suppliers"("supplierId") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_midias_midias" ADD CONSTRAINT "FK_ad7db363f82a4c8a17c7e072981" FOREIGN KEY ("midiasMidiaId") REFERENCES "midias"("midiaId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_tools_tools" ADD CONSTRAINT "FK_bf819602c50a95fa39b816bb2ab" FOREIGN KEY ("suppliersSupplierId") REFERENCES "suppliers"("supplierId") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_tools_tools" ADD CONSTRAINT "FK_05961f7a7240cbaf8b9e270120f" FOREIGN KEY ("toolsToolId") REFERENCES "tools"("toolId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "suppliers_tools_tools" DROP CONSTRAINT "FK_05961f7a7240cbaf8b9e270120f"`
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_tools_tools" DROP CONSTRAINT "FK_bf819602c50a95fa39b816bb2ab"`
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_midias_midias" DROP CONSTRAINT "FK_ad7db363f82a4c8a17c7e072981"`
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_midias_midias" DROP CONSTRAINT "FK_e73813e6ea27fb34c8eb0cc574c"`
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_stuffs_stuffs" DROP CONSTRAINT "FK_0b1db66fd93c8bbbe54d4d44225"`
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_stuffs_stuffs" DROP CONSTRAINT "FK_0b59c78f881fb40c9317dad95ee"`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_c6b937895edd7b8ca6c129caf3e"`
    );
    await queryRunner.query(
      `ALTER TABLE "requisitions" DROP CONSTRAINT "FK_069669ffac52a6a94529782a363"`
    );
    await queryRunner.query(
      `ALTER TABLE "requisitions" DROP CONSTRAINT "FK_905d5501a2c445cb8b7ffe470da"`
    );
    await queryRunner.query(
      `ALTER TABLE "requisitions" DROP CONSTRAINT "FK_b5544e9649899220f779ad33108"`
    );
    await queryRunner.query(
      `ALTER TABLE "movements" DROP CONSTRAINT "FK_68a3ee95d3e84067e02a1c24d3a"`
    );
    await queryRunner.query(
      `ALTER TABLE "movements" DROP CONSTRAINT "FK_97106822000b986efc38bcaa018"`
    );
    await queryRunner.query(
      `ALTER TABLE "movements" DROP CONSTRAINT "FK_a89ea49cb7f9f67e08281816057"`
    );
    await queryRunner.query(
      `ALTER TABLE "entries" DROP CONSTRAINT "FK_1149ff164f8c544ae1095fbaed5"`
    );
    await queryRunner.query(
      `ALTER TABLE "entries" DROP CONSTRAINT "FK_d5c89d969d7812a95cabf03b777"`
    );
    await queryRunner.query(
      `ALTER TABLE "entries" DROP CONSTRAINT "FK_e186b0c87ddac0718d1f6783f98"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_992ae1eac1cc7f3f700b088009d"`
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP CONSTRAINT "FK_1650274d28069abce100aa9d9e1"`
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP CONSTRAINT "FK_77980c752fdeb3689e318fde424"`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" DROP CONSTRAINT "FK_f20ead7040f73a918c4cff018b2"`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" DROP CONSTRAINT "FK_7cd811aa5a5be73dcbf348de9f2"`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" DROP CONSTRAINT "FK_a5f52bf07b0c347a9f0fdcae5dc"`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" DROP CONSTRAINT "FK_dca2bdfc2b82fcefefc159525cf"`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_elements" DROP CONSTRAINT "FK_7a769ab359d36b364d5947903eb"`
    );
    await queryRunner.query(
      `ALTER TABLE "tools" DROP CONSTRAINT "FK_5f396e6cb7ecf1230911cb0ed24"`
    );
    await queryRunner.query(
      `ALTER TABLE "tools" DROP CONSTRAINT "FK_04c976b34f552aaeba3dd5e332a"`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" DROP CONSTRAINT "FK_6686b6e4c33a4b2ed857944fc93"`
    );
    await queryRunner.query(
      `ALTER TABLE "midias" DROP CONSTRAINT "FK_4394121950bbb78586a4f01aa44"`
    );
    await queryRunner.query(
      `ALTER TABLE "stuffs" DROP CONSTRAINT "FK_08f68d40d19c0fcf2c3dbff20a3"`
    );
    await queryRunner.query(
      `ALTER TABLE "stuffs" DROP CONSTRAINT "FK_a3e17336735a1517130127789ae"`
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers" DROP CONSTRAINT "FK_c3a4207c885bed79d6a2699f576"`
    );
    await queryRunner.query(
      `ALTER TABLE "service_orders" DROP CONSTRAINT "FK_c4735a4778698768ce85ac01a11"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_05961f7a7240cbaf8b9e270120"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bf819602c50a95fa39b816bb2a"`
    );
    await queryRunner.query(`DROP TABLE "suppliers_tools_tools"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ad7db363f82a4c8a17c7e07298"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e73813e6ea27fb34c8eb0cc574"`
    );
    await queryRunner.query(`DROP TABLE "suppliers_midias_midias"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0b1db66fd93c8bbbe54d4d4422"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0b59c78f881fb40c9317dad95e"`
    );
    await queryRunner.query(`DROP TABLE "suppliers_stuffs_stuffs"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "companies"`);
    await queryRunner.query(`DROP TABLE "requisitions"`);
    await queryRunner.query(`DROP TABLE "movements"`);
    await queryRunner.query(`DROP TABLE "entries"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "purchases"`);
    await queryRunner.query(`DROP TABLE "purchase_elements"`);
    await queryRunner.query(`DROP TABLE "tools"`);
    await queryRunner.query(`DROP TABLE "midias"`);
    await queryRunner.query(`DROP TABLE "stuffs"`);
    await queryRunner.query(`DROP TABLE "suppliers"`);
    await queryRunner.query(`DROP TABLE "service_orders"`);
  }
}
