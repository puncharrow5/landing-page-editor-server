import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AdminModule } from 'src/admin/admin.module';
import { AdminAccessStrategy } from './admin-access.strategy';
import { AdminUpdateAccessStrategy } from './admin-update-access.strategy';
import { AdminMasterAccessStrategy } from './admin-master-access.strategy';
import { CacheModule } from '@nestjs/cache-manager';
import { EmailModule } from 'src/email/email.module';

@Global()
@Module({
  imports: [AdminModule, EmailModule, CacheModule.register()],
  providers: [
    AuthResolver,
    AuthService,
    AdminAccessStrategy,
    AdminUpdateAccessStrategy,
    AdminMasterAccessStrategy,
  ],
})
export class AuthModule {}
