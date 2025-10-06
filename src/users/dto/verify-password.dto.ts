import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class VerifyPasswordDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[0-9]{7,15}$/)
  user_phone_number!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  user_password!: string;
}


