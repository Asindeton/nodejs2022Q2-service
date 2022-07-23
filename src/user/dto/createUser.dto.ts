import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateUserDto } from '../interface/user.interface';

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
