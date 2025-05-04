import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { FileService } from './file.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { GetFileParam } from './dto';
import { Response } from 'express';
import { MimeObj } from '@libs/config';

@ApiTags('파일 API')
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  @HttpCode(200)
  @Get(':name')
  @ApiResponse({
    content: {
      'image/*': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
    status: 200,
  })
  @ApiParam({
    name: 'name',
    required: true,
    description: '파일명',
  })
  @ApiOperation({
    summary: '이미지 파일 조회 API',
  })
  async getFile(@Param() param: GetFileParam, @Res() res: Response) {
    const fileName = param.name;

    const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);

    const bucket = this.configService.get('AWS_S3_BUCKET');

    return this.fileService
      .getFile(bucket, fileName)
      .then(async (result) => {
        const streamString = await result.Body.transformToString('base64');

        res.contentType(MimeObj[`${fileExtension}`]);

        res.end(streamString, 'base64');

        return;
      })
      .catch((error) => {
        throw new NotFoundException({
          message: '존재하지 않는 파일 입니다.',
        });
      });
  }
}
