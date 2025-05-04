import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from 'src/role/role.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [JwtModule, RoleModule, FileModule],
  providers: [AdminResolver, AdminService],
})
export class AdminModule {}
