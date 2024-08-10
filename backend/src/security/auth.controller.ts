import { AuthService } from './auth.service';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(ValidationPipe) user: User) {
    return this.authService.register(user);
  }

  @Post('login')
  async login(@Body(ValidationPipe) user: User) {
    return this.authService.login(user);
  }
}