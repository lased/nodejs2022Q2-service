import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class albums1658680901089 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'albums',
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
            name: 'year',
            type: 'numeric',
            isNullable: false,
          },
          {
            name: 'artistId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true,
    );
    await queryRunner.query(`
      ALTER TABLE ONLY public.albums
        ADD CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1" FOREIGN KEY ("artistId") REFERENCES public.artists(id) ON DELETE SET NULL;

        INSERT INTO public.albums(id, name, year, "artistId")
            VALUES 
                ('b90bbee1-9617-48d9-b5ad-4dbe9c06e53e', 'album 1', 2020, '1f817a3d-24d1-4257-9b13-717495c0486d'),
                ('61918975-3c1b-4a9c-80f6-ff80c641a50e', 'album 2', 2010, '744024fb-9e45-4d04-818a-6ca1cf484602'),
                ('27b2e133-ec99-4194-9b24-b3b70d111506', 'album 3', 2012, 'f4dc23dd-a05b-4037-b321-3f876c3cca31')
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('albums');
  }
}
