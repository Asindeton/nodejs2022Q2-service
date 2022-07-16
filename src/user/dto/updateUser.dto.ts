import { IsNotEmpty, IsString } from 'class-validator';
import { IUpdatePasswordDto } from '../interface/user.interface';

export class UpdateUserDto implements IUpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}
