import { Module } from '@nestjs/common';
import { StyleService } from './style.service';
import { StyleResolver } from './style.resolver';

@Module({
  providers: [StyleResolver, StyleService],
  exports: [StyleService],
})
export class StyleModule {}
