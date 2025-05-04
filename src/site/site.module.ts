import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteResolver } from './site.resolver';
import { ComponentModule } from 'src/component/component.module';
import { HeaderModule } from 'src/header/header.module';
import { FooterModule } from 'src/footer/footer.module';

@Module({
  imports: [ComponentModule, HeaderModule, FooterModule],
  providers: [SiteResolver, SiteService],
  exports: [SiteService],
})
export class SiteModule {}
