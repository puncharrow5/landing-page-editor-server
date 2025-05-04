import { Module } from '@nestjs/common';
import { MobileChildService } from './mobile-child.service';
import { MobileChildResolver } from './mobile-child.resolver';
import { StyleModule } from 'src/style/style.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [StyleModule, FileModule],
  providers: [MobileChildResolver, MobileChildService],
  exports: [MobileChildService],
})
export class MobileChildModule {}
