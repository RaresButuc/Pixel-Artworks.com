import {
  Delete,
  Get,
  Param,
  Post,
  Body,
  Put,
  Controller,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';

import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { UserRole } from 'src/users/user-role.enum';
import { RolesGuard } from 'src/security/authorization/roles.guard';
import { JwtAuthGuard } from 'src/security/authorization/athz.jwtauthguard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  getPostEntityById(@Param('id') id: number): Promise<PostEntity> {
    return this.postService.getPostById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  addNewPost(): Promise<number> {
    return this.postService.addNewPost();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  editPostById(
    @Param('id') id: number,
    @Body() postData: PostEntity,
  ): Promise<void> {
    return this.postService.editPost(postData, id);
  }

  @Put('status/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  editPostStatusById(@Param('id') id: number): Promise<void> {
    return this.postService.setPublicOrPrivate(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  deleteUserById(@Param('id') id: number): Promise<void> {
    return this.postService.deletePostById(id);
  }
}
