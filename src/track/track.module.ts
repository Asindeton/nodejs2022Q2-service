import { Module } from '@nestjs/common';
import { TrackController } from './controllers/track.controller';
import { TrackService } from './sevices/track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
