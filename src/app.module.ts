import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { JwtModule } from '@nestjs/jwt';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from '@libs/config';
import { PassportModule } from '@nestjs/passport';
import * as redis from 'cache-manager-ioredis';
import { CacheModule } from '@nestjs/cache-manager';
import { ComponentModule } from './component/component.module';
import { AdminModule } from './admin/admin.module';
import { SiteModule } from './site/site.module';
import { AuthModule } from './auth/auth.module';
import { HeaderModule } from './header/header.module';
import { StyleModule } from './style/style.module';
import { FooterModule } from './footer/footer.module';
import { ChildModule } from './child/child.module';
import { FileModule } from './file/file.module';
import { MobileChildModule } from './mobile-child/mobile-child.module';
import { RoleModule } from './role/role.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleWare'),
            logLevel: 'log',
          }),
        ],
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
    }),
    CacheModule.register({
      store: redis,
      host: 'localhost',
      port: 6379,
      password: process.env.REDIS_PASSWORD,
    }),
    AdminModule,
    ComponentModule,
    SiteModule,
    AuthModule,
    HeaderModule,
    StyleModule,
    FooterModule,
    ChildModule,
    FileModule,
    MobileChildModule,
    RoleModule,
    HistoryModule,
  ],
  controllers: [],
  providers: [],
  exports: [JwtModule],
})
export class AppModule {}
