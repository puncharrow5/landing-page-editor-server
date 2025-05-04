import { Prisma, PrismaClient } from '@prisma/client';

const log: Prisma.PrismaClientOptions['log'] = [];

if (process.env.ENVIRONMENT === 'LOCAL') {
  log.push('query');
}

const prismaMysql = new PrismaClient({
  log,
});

// FIXME: isDelete 관련 필드 있을 경우 추가
prismaMysql.$use(async (params, next) => {
  const actions: Prisma.PrismaAction[] = [
    'findFirst',
    'findFirstOrThrow',
    'findMany',
    'findRaw',
    'findUnique',
    'findUniqueOrThrow',
  ];

  const models: Prisma.ModelName[] = ['Component'];

  if (
    params.args?.where &&
    !params.args?.where?.isDelete &&
    models.includes(params.model) &&
    actions.includes(params.action)
  ) {
    params.args['where']['isDelete'] = false;
  }

  return next(params);
});

export const extendedPrismaMySql = prismaMysql;

export type ExtendedPrismaMySql = typeof extendedPrismaMySql;
