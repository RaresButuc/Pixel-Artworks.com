import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Controller } from './s3.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from 'src/posts/post.entity';
import { Photo } from 'src/photos/photo.entity';
import { AuthModule } from 'src/security/authentication/auth.module';

@Module({
  controllers: [S3Controller],
  providers: [S3Service],
  imports: [TypeOrmModule.forFeature([Post]),TypeOrmModule.forFeature([Photo]),AuthModule],
})
export class S3Module {}
