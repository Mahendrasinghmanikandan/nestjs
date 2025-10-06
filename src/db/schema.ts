import { pgTable, text, varchar, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  userPhoneNumber: varchar('user_phone_number', { length: 32 }).notNull(),
  userPassword: text('user_password').notNull(),
});
