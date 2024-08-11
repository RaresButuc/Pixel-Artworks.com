import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new Error('This User Was Not Found!');
      }
      
      return user;
    } catch (error) {
      console.log(error);

      throw new Error(
        'An Error Occurred While Retrieving The User! Please Try Again Later!',
      );
    }
  }

  async deleteUserById(id: number): Promise<void> {
    try {
      await this.userRepository.delete({ id });
    } catch (error) {
      throw new Error('An Error Occurred While Deleting This User!');
    }
  }
}
