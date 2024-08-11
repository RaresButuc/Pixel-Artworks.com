import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';

import { User } from 'src/users/user.entity';
import { UserRole } from 'src/users/user-role.enum';
import { RegisterUserDTO } from 'src/dtos/register.dto';
import { LoginUserDTO } from 'src/dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly jwtService: JwtService,

    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async register({ username, password, email }: RegisterUserDTO) {
    const user = new User();

    user.setEmail(email);
    user.setUsername(username);
    user.setRole(UserRole.USER);
    user.setPassword(await bcrypt.hash(password, 10));

    await this.userRepository.save(user);

    return this.jwtService.sign({
      sub: user.getId(),
      email: user.getEmail(),
      role: user.getRole(),
    });
  }

  async login({ email, password }: LoginUserDTO) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    return this.jwtService.sign({
      sub: user.getId(),
      email: user.getEmail(),
      role: user.getRole(),
    });
  }

  async getToken(): Promise<string> {
    const authHeader = this.request.headers['authorization'];
    if (!authHeader) {
      throw new Error('Authorization header not found');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new Error('Invalid authorization token format');
    }

    return token;
  }

  async getCurrentUser(): Promise<User> {
    const token = await this.getToken();
    const decodedToken = this.jwtService.decode(token) as {
      sub: number;
      email: string;
    };
    if (!decodedToken || !decodedToken.sub) {
      throw new Error('Invalid token');
    }

    const user = await this.userRepository.findOneBy({ id: decodedToken.sub });

    if (!user) {
      throw new Error(
        'Please Authenticate To Be Able To Perform This Command!',
      );
    }

    return user;
  }
}
