import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1687154141355 implements MigrationInterface {
    name = 'categoryToType1687154141355';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `mentions` RENAME COLUMN `category` TO `type`',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `mentions` RENAME COLUMN `type` TO `category`',
        );
    }
}
