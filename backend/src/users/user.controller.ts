import { Controller } from '@nestjs/common';
import { Delete, Get, Param } from '@nestjs/common';

import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUserById(id);
  }
}
