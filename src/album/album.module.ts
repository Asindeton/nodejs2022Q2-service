import { Module } from '@nestjs/common';
import { AlbumController } from './controller/album.controller';
import { AlbumService } from './services/album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
