import { IsString, IsEmail, IsEnum } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { UserRole } from './user-role.enum';
import { Post } from 'src/posts/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @Column()
  @IsString()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
