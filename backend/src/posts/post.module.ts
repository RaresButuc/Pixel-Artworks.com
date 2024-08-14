import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from 'src/s3/s3.module';
import { AuthModule } from 'src/security/authentication/auth.module';
import { PostController } from './post.controller';

import { Post } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), AuthModule,S3Module],
  providers: [PostService],
  controllers: [PostController],
  exports:[PostService]
})
export class PostModule {}
