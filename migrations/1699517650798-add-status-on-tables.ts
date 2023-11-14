import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusOnTables1699517650798 implements MigrationInterface {
    name = 'AddStatusOnTables1699517650798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wallet\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`wallet\` DROP COLUMN \`status\``);
    }

}
