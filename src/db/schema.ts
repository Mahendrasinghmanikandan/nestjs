import { pgTable, text, varchar, uniqueIndex } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    userPhoneNumber: varchar('user_phone_number', { length: 32 }).notNull(),
    userPassword: text('user_password').notNull(),
  },
);


