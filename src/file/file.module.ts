import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileResolver } from './file.resolver';

@Module({
  controllers: [FileController],
  providers: [FileResolver, FileService],
  exports: [FileService],
})
export class FileModule {}
