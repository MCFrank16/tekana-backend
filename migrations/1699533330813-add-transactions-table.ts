import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTransactionsTable1699533330813 implements MigrationInterface {
    name = 'AddTransactionsTable1699533330813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` varchar(36) NOT NULL, \`amount\` decimal NOT NULL DEFAULT '0', \`from\` varchar(255) NOT NULL, \`to\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`transaction\``);
    }

}
