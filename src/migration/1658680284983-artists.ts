import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class artists1658680284983 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'artists',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'character varying',
            isNullable: false,
          },
          {
            name: 'grammy',
            type: 'boolean',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.query(`
          INSERT INTO public.artists(id, name, grammy)
            VALUES ('1f817a3d-24d1-4257-9b13-717495c0486d', 'artist 1', true),
            ('744024fb-9e45-4d04-818a-6ca1cf484602', 'artist 2', false),
            ('f4dc23dd-a05b-4037-b321-3f876c3cca31', 'artist 3', true)
        `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('artists');
  }
}
