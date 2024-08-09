import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getPostById(id: number): Promise<Post> {
    try {
      const post = await this.postRepository.findOneBy({ id });

      if (!post) {
        throw new Error("This Post Doesn't Exists! Try Again Later!");
      }

      return post;
    } catch (error) {
      throw new Error("The Post You Are Looking For Doesn't Exist!");
    }
  }

  async addNewPost(post: Post): Promise<number> {
    try {
      return (await this.postRepository.save(post)).id;
    } catch (error) {
      throw new Error(
        'An Error Has Occurred! Be Careful To Complete Each Field Of The Post Correctly!',
      );
    }
  }

  async editPost(newPostData: Post, id: number): Promise<void> {
    try {
      const currentPost = await this.getPostById(id);

      currentPost.setLink(newPostData.getLink());
      currentPost.setTitle(newPostData.getTitle());
      currentPost.setDescription(newPostData.getDescription());

      await this.postRepository.save(currentPost);
    } catch (error) {
      throw new Error(
        'An Error Has Occurred! Be Careful To Complete Each Field Of The Post Correctly!',
      );
    }
  }

  async setPublicOrPrivate(id: number): Promise<void> {
    try {
      const currentPost = await this.getPostById(id);

      currentPost.setStatus(!currentPost.getStatus);

      await this.postRepository.save(currentPost);
    } catch (error) {
      throw new Error(
        'An Error Has Occurred! Be Careful To Complete Each Field Of The Post Correctly!',
      );
    }
  }

  async deletePostById(id: number): Promise<void> {
    try {
      await this.postRepository.delete({ id });
    } catch (error) {
      throw new Error('An Error Occurred While Deleting This Post!');
    }
  }
}
