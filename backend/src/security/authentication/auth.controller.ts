import { AuthService } from './auth.service';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { RegisterUserDTO } from 'src/dtos/register.dto';
import { LoginUserDTO } from 'src/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterUserDTO) {
    return this.authService.register(user);
  }

  @Post('login')
  async login(@Body(ValidationPipe) user: LoginUserDTO) {
    return this.authService.login(user);
  }
}