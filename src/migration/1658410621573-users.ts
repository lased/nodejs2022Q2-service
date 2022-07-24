import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class users1658410621573 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'login',
            type: 'character varying',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'character varying',
            isNullable: false,
          },
          {
            name: 'version',
            type: 'integer',
            default: 1,
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp without time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp without time zone',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.query(`
      INSERT INTO public.users(login, password)
      VALUES ('test',	'$2b$10$Et4F75F2Sepq.rgZdV4g8u8AXN3X2uiS/smJSKN9ZXwkZoHbySnTy'),
            ('test',	'$2b$10$Et4F75F2Sepq.rgZdV4g8u8AXN3X2uiS/smJSKN9ZXwkZoHbySnTy'),
            ('test',	'$2b$10$Et4F75F2Sepq.rgZdV4g8u8AXN3X2uiS/smJSKN9ZXwkZoHbySnTy')
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
