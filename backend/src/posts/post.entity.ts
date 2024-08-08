import { IsString, IsUrl, IsBoolean } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,OneToOne } from 'typeorm';

import { User } from 'src/users/user.entity';
import { Photo } from 'src/photos/photo.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsBoolean()
  status: boolean;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @OneToOne(() => Photo, (photo) => photo.post)
  photo: Photo;

  @Column()
  @IsUrl()
  link: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
