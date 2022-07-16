import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UuidMiddleware } from './shared/uuid.middleware';
import { TrackModule } from './track/track.module';

@Module({
  imports: [UserModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(UuidMiddleware).forRoutes(':model/:id', 'favs/:model/:id');
  }
}
