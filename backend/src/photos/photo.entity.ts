import { IsString } from 'class-validator';
import { Post } from 'src/posts/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  bucket: string;

  @Column()
  @IsString()
  key: string;

  @Column()
  @OneToOne(() => Post, (post) => post.photo)
  post: Post;
}
