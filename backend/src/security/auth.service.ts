import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async register({ username, password, email }: User) {
    const user = new User();

    user.setUsername(username);
    user.setPassword(await bcrypt.hash(password, 10));
    user.setEmail(email);
    await this.userRepository.save(user);

    return this.jwtService.sign({ sub: user.getId(), email: user.getEmail() });
  }

  async login({ email, password }: User) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    return this.jwtService.sign({ sub: user.getId(), email: user.getEmail() });
  }
}
