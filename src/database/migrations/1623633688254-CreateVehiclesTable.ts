import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVehiclesTable1623633688254 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vehicles',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'model',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'manufacturer',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'plate',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'color',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        isNullable: false,
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        isNullable: false,
                        default: 'now()',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp with time zone',
                        isNullable: true,
                        default: null,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vehicles');
    }

}
