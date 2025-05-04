import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthModel } from 'src/auth/auth.model';

export const CurrentAuth = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    // rest api request
    const request = context.switchToHttp().getRequest();

    // graphql request
    const gqlContext = GqlExecutionContext.create(context).getContext();

    const auth: AuthModel = gqlContext?.req?.user || request?.user;
    return auth;
  },
);
