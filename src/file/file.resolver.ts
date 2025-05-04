import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AdminUpdateAccessGuard } from '@libs/guard';
import { FileService } from './file.service';
import { UploadImageArgs } from './dto';

@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => String, { description: '이미지 업로드' })
  uploadImage(@Args() uploadImageArgs: UploadImageArgs) {
    return this.fileService.uploadImage(uploadImageArgs);
  }
}
