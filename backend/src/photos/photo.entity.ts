import { IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

import { Post } from 'src/posts/post.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  private bucket: string;

  @Column()
  @IsString()
  private key: string;

  @Column()
  @OneToOne(() => Post, (post) => post.getPhoto())
  private post: Post;

  // Getter pentru bucket
  getBucket(): string {
    return this.bucket;
  }

  // Setter pentru bucket
  setBucket(bucket: string): void {
    this.bucket = bucket;
  }

  // Getter pentru key
  getKey(): string {
    return this.key;
  }

  // Setter pentru key
  setKey(key: string): void {
    this.key = key;
  }

  // Getter pentru post
  getPost(): Post {
    return this.post;
  }

  // Setter pentru post
  setPost(post: Post): void {
    this.post = post;
  }
}
