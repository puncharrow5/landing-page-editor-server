import { Module } from '@nestjs/common';
import { ChildService } from './child.service';
import { ChildResolver } from './child.resolver';

import { StyleModule } from 'src/style/style.module';

@Module({
  imports: [StyleModule],
  providers: [ChildResolver, ChildService],
  exports: [ChildService],
})
export class ChildModule {}
