import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  const seedUsers = [
    { user_phone_number: '9876543210', user_password: 'Customer@123' },
    { user_phone_number: '9976543210', user_password: 'Customer@456' },
  ];

  for (const u of seedUsers) {
    const hash = await bcrypt.hash(u.user_password, 10);

    const exists = await db
      .select({ userPhoneNumber: users.userPhoneNumber })
      .from(users)
      .where(eq(users.userPhoneNumber, u.user_phone_number))
      .limit(1);

    if (exists.length === 0) {
      await db.insert(users).values({
        userPhoneNumber: u.user_phone_number,
        userPassword: hash,
        id: uuidv4(),
      });
    }
  }

  await pool.end();
  console.log('Seed completed');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


