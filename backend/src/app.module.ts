import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';
import { PhotoModule } from './photos/photo.module';

@Module({
  imports: [UserModule, PostModule, PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
