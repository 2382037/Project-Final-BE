import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateShoesTable1746427966993 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE shoes (
              id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL,
              name VARCHAR(255) NOT NULL,
              size INTEGER NOT NULL,
              price INTEGER NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            );
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE shoes;`);
    }

}
