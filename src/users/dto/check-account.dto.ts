import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CheckAccountDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[0-9]{7,15}$/)
  user_phone_number!: string;
}


