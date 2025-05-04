import { Module } from '@nestjs/common';
import { FooterService } from './footer.service';
import { FooterResolver } from './footer.resolver';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule],
  providers: [FooterResolver, FooterService],
  exports: [FooterService],
})
export class FooterModule {}
