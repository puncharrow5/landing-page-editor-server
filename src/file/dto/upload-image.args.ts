import { Field, ArgsType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@ArgsType()
export class UploadImageArgs {
  @Field(() => GraphQLUpload, {
    description: '이미지 파일',
    nullable: true,
  })
  @IsOptional()
  file: FileUpload | null;
}
