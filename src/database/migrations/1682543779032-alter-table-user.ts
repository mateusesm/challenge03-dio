import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm"

export class AlterTableUser1682543779032 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ADD "balance" int`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
