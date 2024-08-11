import { IsString, IsUrl, IsBoolean } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import { User } from 'src/users/user.entity';
import { Photo } from 'src/photos/photo.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsBoolean()
  isPostedStatus: boolean;

  @Column({ nullable: true })
  @IsString()
  title: string;

  @Column({ nullable: true })
  @IsString()
  description: string;

  @OneToOne(() => Photo, (photo) => photo.post, {
    orphanedRowAction: 'delete',
  })
  photo: Photo;

  @Column({ nullable: true })
  @IsUrl()
  link: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  // Getter pentru title
  getId(): number {
    return this.id;
  }

  // Getter pentru status
  getStatus(): boolean {
    return this.isPostedStatus;
  }

  // Setter pentru status
  setStatus(status: boolean): void {
    this.isPostedStatus = status;
  }

  // Getter pentru title
  getTitle(): string {
    return this.title;
  }

  // Setter pentru title
  setTitle(title: string): void {
    this.title = title;
  }

  // Getter pentru description
  getDescription(): string {
    return this.description;
  }

  // Setter pentru description
  setDescription(description: string): void {
    this.description = description;
  }

  // Getter pentru photo
  getPhoto(): Photo {
    return this.photo;
  }

  // Setter pentru photo
  setPhoto(photo: Photo): void {
    this.photo = photo;
  }

  // Getter pentru link
  getLink(): string {
    return this.link;
  }

  // Setter pentru link
  setLink(link: string): void {
    this.link = link;
  }

  // Getter pentru user
  getUser(): User {
    return this.user;
  }

  // Getter pentru user
  setUser(user: User): void {
    this.user = user;
  }
}
