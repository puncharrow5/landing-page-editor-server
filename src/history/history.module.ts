import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryResolver } from './history.resolver';
import { SiteModule } from 'src/site/site.module';

@Module({
  imports: [SiteModule],
  providers: [HistoryResolver, HistoryService],
})
export class HistoryModule {}
