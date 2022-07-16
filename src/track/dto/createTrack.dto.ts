import { ICreateTrackDto } from '../interface/track.interface';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto implements ICreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number; // integer number

  @IsUUID()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsUUID()
  @IsOptional()
  albumId: string | null; // refers to Album
}
