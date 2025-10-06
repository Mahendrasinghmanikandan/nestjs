import 'dotenv/config';
import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

export const DRIZZLE = 'DRIZZLE';

@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: async () => {
        const pool = new Pool({
          connectionString: process.env.DATABASE_URL,
        });
        return drizzle(pool);
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DbModule {}


