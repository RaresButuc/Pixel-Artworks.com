import { Multer } from 'multer';
import { S3Service } from './s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/security/authorization/athz.jwtauthguard';
import { RolesGuard } from 'src/security/authorization/roles.guard';
import { UserRole } from 'src/users/user-role.enum';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Multer.File, @Param('id') id: number) {
        return this.s3Service.uploadFile(id, file);
  }
}
