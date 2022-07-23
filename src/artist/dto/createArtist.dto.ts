import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ICreateArtistDto } from '../interface/artist.interface';

export class CreateArtistDto implements ICreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
