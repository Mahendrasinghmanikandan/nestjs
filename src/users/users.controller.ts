import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CheckAccountDto } from './dto/check-account.dto';
import { VerifyPasswordDto } from './dto/verify-password.dto';
import { SuccessMessage } from '../common/decorators/success-message.decorator';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('check_account_exist')
  @HttpCode(200)
  @SuccessMessage('Account existence checked')
  checkAccount(@Body() dto: CheckAccountDto) {
    return this.usersService.checkAccountExist(dto);
  }

  @Post('verify_password')
  @HttpCode(200)
  @SuccessMessage('Password verification completed')
  verifyPassword(@Body() dto: VerifyPasswordDto) {
    return this.usersService.verifyPassword(dto);
  }
}


