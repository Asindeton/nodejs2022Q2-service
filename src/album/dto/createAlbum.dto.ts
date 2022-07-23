import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ICreateAlbumDto } from '../interface/album.interface';

export class CreateAlbumDto implements ICreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}
