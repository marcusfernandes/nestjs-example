import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTable1599955398518 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'user',
        columns: [
          {
            name:'id',
            type:'int',
            isPrimary: true,
            isGenerated:true,
            generationStrategy:'increment',
          },
          {
            name:'name',
            type:'varchar',
          },
          {
            name:'username',
            type:'varchar',
          },
          {
            name:'email',
            type:'varchar',
          },
          {
            name:'password',
            type:'varchar',
          },
          {
            name:'created_at',
            type:'timestamp',
            default: 'CURRENT_TIMESTAMP'
          },
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('user')
    }

}
