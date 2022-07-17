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
import { IAlbum } from '../interface/album.interface';
import { CreateAlbumDto } from '../dto/createAlbum.dto';
import { AlbumService } from '../services/album.service';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAllUsers(): Promise<IAlbum[]> {
    return this.albumService.getAllAlbum();
  }

  @Get(':id')
  async getUserById(@Param() params): Promise<IAlbum> {
    return this.albumService.getAlbumByID(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  async updateUserPassword(
    @Param() params,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    return this.albumService.updateAlbum(params.id, createAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param() params) {
    return this.albumService.deleteAlbum(params.id);
  }
}
