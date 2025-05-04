import { Module } from '@nestjs/common';
import { ChildService } from './child.service';
import { ChildResolver } from './child.resolver';
import { FileModule } from 'src/file/file.module';
import { StyleModule } from 'src/style/style.module';

@Module({
  imports: [StyleModule, FileModule],
  providers: [ChildResolver, ChildService],
  exports: [ChildService],
})
export class ChildModule {}
