import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';

import { User } from 'src/users/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: '4AXYQCAjrV9AXEGk64ALmEduH6rqrfUB5sNYnVgCkfZT6Hz25p',
      signOptions: { expiresIn: '1440m' },
    }),
  ],
  exports: [AuthService,JwtModule],
})
export class AuthModule {}
