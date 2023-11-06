import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomerTable1698519803153 implements MigrationInterface {
    name = 'CreateCustomerTable1698519803153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` varchar(36) NOT NULL, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phonenumber\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`email\` (\`email\`), INDEX \`phonenumber\` (\`phonenumber\`), UNIQUE INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` (\`email\`), UNIQUE INDEX \`IDX_5d97650bfcfa4099f861d187ba\` (\`phonenumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_5d97650bfcfa4099f861d187ba\` ON \`customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` ON \`customer\``);
        await queryRunner.query(`DROP INDEX \`phonenumber\` ON \`customer\``);
        await queryRunner.query(`DROP INDEX \`email\` ON \`customer\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
    }

}
