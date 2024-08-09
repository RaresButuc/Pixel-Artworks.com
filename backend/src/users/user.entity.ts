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
    nullable: false,
  })
  @IsEnum(UserRole)
  private role: UserRole;

  @Column({ nullable: false })
  @IsString()
  private username: string;

  @Column({ nullable: false })
  @IsEmail()
  private email: string;

  @Column({ nullable: false })
  private password: string;

  @OneToMany(() => Post, (post) => post.getUser())
  private posts: Post[];

  // Getter pentru role
  getRole(): UserRole {
    return this.role;
  }

  // Setter pentru role
  setRole(role: UserRole): void {
    this.role = role;
  }

  // Getter pentru username
  getUsername(): string {
    return this.username;
  }

  // Setter pentru username
  setUsername(username: string): void {
    this.username = username;
  }

  // Getter pentru email
  getEmail(): string {
    return this.email;
  }

  // Setter pentru email
  setEmail(email: string): void {
    this.email = email;
  }

  // Getter pentru password
  getPassword(): string {
    return this.password;
  }

  // Setter pentru password
  setPassword(password: string): void {
    this.password = password;
  }

  // Getter pentru posts
  getPosts(): Post[] {
    return this.posts;
  }

  // Setter pentru posts
  setPosts(posts: Post[]): void {
    this.posts = posts;
  }
}
