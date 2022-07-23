import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateArtistDto } from '../dto/createArtist.dto';
import { ArtistService } from '../services/artist.service';
import { IArtist } from '../interface/artist.interface';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getAllUsers(): Promise<IArtist[]> {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  async getUserById(@Param() params): Promise<IArtist> {
    return this.artistService.getArtistByID(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createArtistDto: CreateArtistDto): Promise<IArtist> {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  async updateUserPassword(
    @Param() params,
    @Body() createArtistDto: CreateArtistDto,
  ) {
    return this.artistService.updateArtist(params.id, createArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param() params) {
    return this.artistService.deleteArtist(params.id);
  }
}
