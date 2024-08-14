import * as AWS from 'aws-sdk';
import { Multer } from 'multer';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Post } from '../posts/post.entity';
import { Photo } from 'src/photos/photo.entity';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {
    this.s3 = new AWS.S3({
      accessKeyId: 'AKIAW3MD7NUGWZ3WER7G',
      secretAccessKey: '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',
      region: 'eu-central-1',
    });
  }

  async uploadFile(id: number, file: Multer.File) {
    const bucket = 'pixelartworks';
    const key = `${id}_image`;

    const post = await this.postRepository.findOneBy({ id });

    const params = {
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
    };

    try {
      const newPhoto = new Photo();
      newPhoto.setKey(key);
      newPhoto.setPost(post);
      newPhoto.setBucket(bucket);

      const photoSaved = await this.photoRepository.save(newPhoto);

      await this.s3.upload(params).promise();

      post.setPhoto(photoSaved);
      this.postRepository.save(post);
      return true;
    } catch (error) {
      // console.error(error);
      return false;
    }
  }
}
