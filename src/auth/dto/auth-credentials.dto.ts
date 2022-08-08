import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  password: string;
}
