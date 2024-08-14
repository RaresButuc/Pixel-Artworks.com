import { Post } from 'src/posts/post.entity';
import { Column } from 'typeorm';

export class PostWithPhotoDTO {
  @Column({ nullable: false })
  photo: Buffer;

  @Column({ nullable: false })
  post: Post;

  // Getter pentru photo
  getPhoto(): Buffer {
    return this.photo;
  }

  // Setter pentru photo
  setPhoto(value: Buffer) {
    this.photo = value;
  }

  // Getter pentru post
  getPost(): Post {
    return this.post;
  }

  // Setter pentru post
  setPost(value: Post) {
    this.post = value;
  }
}
