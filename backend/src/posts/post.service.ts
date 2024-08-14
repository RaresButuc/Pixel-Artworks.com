import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Post } from './post.entity';
import { AuthService } from 'src/security/authentication/auth.service';
import { S3Service } from 'src/s3/s3.service';
import { PostWithPhotoDTO } from 'src/dtos/postsWithPhoto.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private readonly authService: AuthService,
    private readonly s3Service: S3Service,
  ) {}

  async getPostById(id: number): Promise<Post> {
    try {
      const post = await this.postRepository.findOneBy({ id });

      if (!post) {
        throw new Error('This Post Is Not Available Anymore! Try Again Later');
      }

      return post;
    } catch (error) {
      throw new Error("The Post You Are Looking For Doesn't Exist!");
    }
  }

  async getAllPostsAdmin(): Promise<PostWithPhotoDTO[]> {
    try {
      const posts = await this.postRepository.find();
  
      const postsWithPhotos = await Promise.all(
        posts.map(async (e) => {
          const postWithPhoto = new PostWithPhotoDTO();
          const photo = await this.s3Service.getPhoto(e.id);
          postWithPhoto.setPost(e);
          postWithPhoto.setPhoto(photo);
  
          return postWithPhoto;
        })
      );
  
      return postsWithPhotos;
    } catch (error) {
      throw new Error('The Posts Are Unavailable Right Now! Try Again Later');
    }
  }

  async getAllPostsAnyone(): Promise<PostWithPhotoDTO[]> {
    try {
      return (await this.getAllPostsAdmin()).filter((e) =>
        e.getPost().getStatus(),
      );
    } catch (error) {
      throw new Error('The Posts Are Unavailable Right Now! Try Again Later');
    }
  }

  async addNewPost(post: Post): Promise<number> {
    try {
      const newPost = new Post();
      const currentUser = await this.authService.getCurrentUser();

      newPost.setTitle(post.title);
      newPost.setDescription(post.description);
      newPost.setLink(post.link);
      newPost.setStatus(false);
      newPost.setUser(currentUser);

      return (await this.postRepository.save(newPost)).getId();
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  }

  async editPost(newPostData: Post, id: number): Promise<void> {
    try {
      const currentPost = await this.getPostById(id);

      if (!currentPost) {
        throw new Error('This User Was Not Found!');
      }

      currentPost.setLink(newPostData.link);
      currentPost.setTitle(newPostData.title);
      currentPost.setDescription(newPostData.description);

      await this.postRepository.save(currentPost);
    } catch (error) {
      throw new Error(error);
    }
  }

  async setPublicOrPrivate(id: number): Promise<void> {
    try {
      const currentPost = await this.getPostById(id);

      if (!currentPost) {
        throw new Error('This User Was Not Found!');
      }

      currentPost.setStatus(!currentPost.getStatus());

      await this.postRepository.save(currentPost);
    } catch (error) {
      throw new Error(error);
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
