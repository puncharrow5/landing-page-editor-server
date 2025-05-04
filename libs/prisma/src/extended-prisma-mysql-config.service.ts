import { Injectable } from '@nestjs/common';
import { CustomPrismaClientFactory } from 'nestjs-prisma';
import { ExtendedPrismaMySql, extendedPrismaMySql } from './prisma.extension';

@Injectable()
export class ExtendedPrismaMysqlConfigService
  implements CustomPrismaClientFactory<ExtendedPrismaMySql>
{
  constructor() {
    // TODO inject any other service here like the `ConfigService`
  }

  createPrismaClient(): ExtendedPrismaMySql {
    // you could pass options to your `PrismaClient` instance here
    return extendedPrismaMySql;
  }
}
