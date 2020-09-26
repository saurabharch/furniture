import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableMedicine1601050655802 implements MigrationInterface {
    name = 'createTableMedicine1601050655802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "medicine" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "price" int NOT NULL, CONSTRAINT "PK_b9e0e6f37b7cadb5f402390928b" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE UNIQUE INDEX "IDX_a6d41adfb2bad3f805e0605992" ON "medicine" ("name", "deleted_at") ');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP INDEX "IDX_a6d41adfb2bad3f805e0605992"');
        await queryRunner.query('DROP TABLE "medicine"');
    };
}
