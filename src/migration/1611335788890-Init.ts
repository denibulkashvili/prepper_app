import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1611335788890 implements MigrationInterface {
  name = 'Init1611335788890'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "items_type_enum" AS ENUM('article', 'video', 'book', 'course', 'other')`)
    await queryRunner.query(
      `CREATE TABLE "items" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "chapterId" integer NOT NULL, "url" character varying, "type" "items_type_enum" NOT NULL DEFAULT 'other', CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "chapters" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_a2bbdbb4bdc786fe0cb0fcfc4a0" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "firstName" character varying, "lastName" character varying, "email" character varying NOT NULL, "ssoId" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "subscriptions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer NOT NULL, "chapterId" integer NOT NULL, CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "completed_items" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "itemId" integer NOT NULL, "subscriptionId" integer NOT NULL, CONSTRAINT "PK_56fa87aed4b5ce29be2fdb308c9" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_19fc3c387ba1cb03d37d99ba89a" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_ba73fd0cfd4a4f5d6c374654a4b" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "completed_items" ADD CONSTRAINT "FK_e6422a64e349ae2af52ca46d92a" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "completed_items" ADD CONSTRAINT "FK_bf18a8da417aeb32ddce47b20d7" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "completed_items" DROP CONSTRAINT "FK_bf18a8da417aeb32ddce47b20d7"`)
    await queryRunner.query(`ALTER TABLE "completed_items" DROP CONSTRAINT "FK_e6422a64e349ae2af52ca46d92a"`)
    await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_ba73fd0cfd4a4f5d6c374654a4b"`)
    await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84"`)
    await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_19fc3c387ba1cb03d37d99ba89a"`)
    await queryRunner.query(`DROP TABLE "completed_items"`)
    await queryRunner.query(`DROP TABLE "subscriptions"`)
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP TABLE "chapters"`)
    await queryRunner.query(`DROP TABLE "items"`)
    await queryRunner.query(`DROP TYPE "items_type_enum"`)
  }
}
