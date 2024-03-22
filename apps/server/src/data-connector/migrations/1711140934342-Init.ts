import { MigrationInterface, QueryRunner } from 'typeorm';
import { query } from '@angular/animations';

export class Init1711140934342 implements MigrationInterface {
  name = 'Init1711140934342';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA "unifi"`);
    await queryRunner.query(`CREATE TABLE "unifi"."product"
                             (
                               "id"                             SERIAL                   NOT NULL,
                               "created_at"                     TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                               "updated_at"                     TIMESTAMP WITH TIME ZONE          DEFAULT now(),
                               "deleted_at"                     TIMESTAMP,
                               "unifi_id"                       character varying        NOT NULL,
                               "title"                          character varying        NOT NULL,
                               "short_title"                    character varying        NOT NULL,
                               "name"                           character varying        NOT NULL,
                               "slug"                           character varying        NOT NULL,
                               "collection_slug"                character varying        NOT NULL,
                               "organizational_collection_slug" character varying        NOT NULL,
                               "short_description"              character varying        NOT NULL,
                               CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_ce5a7c4b25a3abdf1ad2ab82aa" ON "unifi"."product" ("unifi_id") `
    );
    await queryRunner.query(
      `CREATE TYPE "unifi"."variant_status_enum" AS ENUM('Available', 'SoldOut')`
    );
    await queryRunner.query(
      `CREATE TYPE "unifi"."variant_region_enum" AS ENUM('eu', 'us', 'uk')`
    );
    await queryRunner.query(`CREATE TABLE "unifi"."variant"
                             (
                               "id"         SERIAL                        NOT NULL,
                               "created_at" TIMESTAMP WITH TIME ZONE      NOT NULL DEFAULT now(),
                               "updated_at" TIMESTAMP WITH TIME ZONE               DEFAULT now(),
                               "deleted_at" TIMESTAMP,
                               "unifi_id"   character varying             NOT NULL,
                               "sku"        character varying             NOT NULL,
                               "title"      character varying             NOT NULL,
                               "status"     "unifi"."variant_status_enum" NOT NULL,
                               "price"      integer                       NOT NULL,
                               "currency"   character varying             NOT NULL,
                               "stock"      integer                       NOT NULL,
                               "region"     "unifi"."variant_region_enum" NOT NULL,
                               "product_id" integer                       NOT NULL,
                               CONSTRAINT "PK_f8043a8a34fa021a727a4718470" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f9e23b1104919327431fb704e7" ON "unifi"."variant" ("unifi_id") `
    );
    await queryRunner.query(`CREATE TABLE "unifi"."gallery_item"
                             (
                               "id"         SERIAL                   NOT NULL,
                               "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                               "updated_at" TIMESTAMP WITH TIME ZONE          DEFAULT now(),
                               "deleted_at" TIMESTAMP,
                               "unifi_id"   character varying        NOT NULL,
                               "mime_type"  character varying        NOT NULL,
                               "url"        character varying        NOT NULL,
                               "height"     smallint                 NOT NULL,
                               "width"      smallint                 NOT NULL,
                               "variant_id" integer                  NOT NULL,
                               CONSTRAINT "PK_87d0be7fe9ce5d542b6cf4941fd" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b205867ba88fae6c87a47b045f" ON "unifi"."gallery_item" ("unifi_id") `
    );
    await queryRunner.query(`ALTER TABLE "unifi"."variant"
      ADD CONSTRAINT "FK_738bfa62f918ad1436cb5c8ee5b" FOREIGN KEY ("product_id") REFERENCES "unifi"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "unifi"."gallery_item"
      ADD CONSTRAINT "FK_dc5cf059b1b48bad23c7efa881b" FOREIGN KEY ("variant_id") REFERENCES "unifi"."variant" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "unifi"."gallery_item"
      DROP CONSTRAINT "FK_dc5cf059b1b48bad23c7efa881b"`);
    await queryRunner.query(`ALTER TABLE "unifi"."variant"
      DROP CONSTRAINT "FK_738bfa62f918ad1436cb5c8ee5b"`);
    await queryRunner.query(
      `DROP INDEX "unifi"."IDX_b205867ba88fae6c87a47b045f"`
    );
    await queryRunner.query(`DROP TABLE "unifi"."gallery_item"`);
    await queryRunner.query(
      `DROP INDEX "unifi"."IDX_f9e23b1104919327431fb704e7"`
    );
    await queryRunner.query(`DROP TABLE "unifi"."variant"`);
    await queryRunner.query(`DROP TYPE "unifi"."variant_region_enum"`);
    await queryRunner.query(`DROP TYPE "unifi"."variant_status_enum"`);
    await queryRunner.query(
      `DROP INDEX "unifi"."IDX_ce5a7c4b25a3abdf1ad2ab82aa"`
    );
    await queryRunner.query(`DROP TABLE "unifi"."product"`);
  }
}
