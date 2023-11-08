import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTables1699450290872 implements MigrationInterface {
    name = 'AddTables1699450290872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`wallet\` (\`id\` varchar(36) NOT NULL, \`amount\` decimal NOT NULL DEFAULT '0', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` varchar(36) NOT NULL, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phonenumber\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`walletId\` varchar(36) NULL, INDEX \`email\` (\`email\`), INDEX \`phonenumber\` (\`phonenumber\`), UNIQUE INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` (\`email\`), UNIQUE INDEX \`IDX_5d97650bfcfa4099f861d187ba\` (\`phonenumber\`), UNIQUE INDEX \`REL_d760f4f58e84910b3e1220ef5a\` (\`walletId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_d760f4f58e84910b3e1220ef5a3\` FOREIGN KEY (\`walletId\`) REFERENCES \`wallet\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_d760f4f58e84910b3e1220ef5a3\``);
        await queryRunner.query(`DROP INDEX \`REL_d760f4f58e84910b3e1220ef5a\` ON \`customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_5d97650bfcfa4099f861d187ba\` ON \`customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` ON \`customer\``);
        await queryRunner.query(`DROP INDEX \`phonenumber\` ON \`customer\``);
        await queryRunner.query(`DROP INDEX \`email\` ON \`customer\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP TABLE \`wallet\``);
    }

}
