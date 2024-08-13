import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { S3Module } from './s3/s3.module';
import { Post } from './posts/post.entity';
import { User } from './users/user.entity';
import { Photo } from './photos/photo.entity';
import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';
import { PhotoModule } from './photos/photo.module';
import { AuthModule } from './security/authentication/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '20022006',
      database: 'pixelartworks',
      entities: [Post, Photo, User],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    PostModule,
    PhotoModule,
    S3Module,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
