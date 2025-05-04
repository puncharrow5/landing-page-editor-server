import { Module } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ComponentResolver } from './component.resolver';
import { StyleModule } from 'src/style/style.module';
import { ChildModule } from 'src/child/child.module';
import { FileModule } from 'src/file/file.module';
import { MobileChildModule } from 'src/mobile-child/mobile-child.module';

@Module({
  imports: [StyleModule, ChildModule, MobileChildModule, FileModule],
  providers: [ComponentResolver, ComponentService],
  exports: [ComponentService],
})
export class ComponentModule {}
