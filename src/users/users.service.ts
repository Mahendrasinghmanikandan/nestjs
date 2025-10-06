import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../db/db.module';
import { users } from '../db/schema';
import { CheckAccountDto } from './dto/check-account.dto';
import { VerifyPasswordDto } from './dto/verify-password.dto';
import * as bcrypt from 'bcrypt';

type DrizzleDb = import('drizzle-orm/node-postgres').NodePgDatabase;

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  async checkAccountExist(dto: CheckAccountDto): Promise<{ exists: boolean }> {
    const rows = await this.db
      .select({ userPhoneNumber: users.userPhoneNumber })
      .from(users)
      .where(eq(users.userPhoneNumber, dto.user_phone_number))
      .limit(1);
    if (rows.length === 0) {
      throw new NotFoundException('Account not found');
    }
    return { exists: true };
  }

  async verifyPassword(dto: VerifyPasswordDto): Promise<{ valid: boolean }> {
    const rows = await this.db
      .select({ userPassword: users.userPassword })
      .from(users)
      .where(eq(users.userPhoneNumber, dto.user_phone_number))
      .limit(1);

    if (rows.length === 0) {
      throw new NotFoundException('Account not found');
    }

    const isValid = await bcrypt.compare(
      dto.user_password,
      rows[0].userPassword,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return { valid: true };
  }
}
