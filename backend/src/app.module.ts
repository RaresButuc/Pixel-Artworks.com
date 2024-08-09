import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';
import { PhotoModule } from './photos/photo.module';
import { UserController } from './users/user.controller';
import { PostController } from './posts/post.controller';
import { UserService } from './users/user.service';
import { PostService } from './posts/post.service';

@Module({
  imports: [UserModule, PostModule, PhotoModule],
  controllers: [AppController, UserController, PostController],
  providers: [AppService, UserService, PostService],
})
export class AppModule {}
