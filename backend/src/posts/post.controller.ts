import { Controller } from '@nestjs/common';
import { Delete, Get, Param, Post, Body, Put } from '@nestjs/common';

import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  getPostEntityById(@Param('id') id: number): Promise<PostEntity> {
    return this.postService.getPostById(id);
  }

  @Post(':id')
  editPostById(@Param('id') id: number, @Body() postData: PostEntity): Promise<void> {
    return this.postService.editPost(postData, id);
  }

  @Put(':id')
  editPostStatusById(@Param('id') id: number): Promise<void> {
    return this.postService.setPublicOrPrivate(id);
  }

  @Put(':id')
  getPostById(@Body() postData: PostEntity): Promise<number> {
    return this.postService.addNewPost(postData);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: number): Promise<void> {
    return this.postService.deletePostById(id);
  }
}
