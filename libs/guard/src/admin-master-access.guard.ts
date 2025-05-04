import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminMasterAccessGuard
  extends AuthGuard('admin-master-access')
  implements CanActivate
{
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext): Request {
    const restRequest: Request = context.switchToHttp().getRequest();
    const gqlRequest = GqlExecutionContext.create(context).getContext().req;

    return restRequest ?? gqlRequest;
  }

  handleRequest(err, admin, info) {
    if (err || !admin) {
      throw (
        err || new UnauthorizedException({ message: '접근 권한이 없습니다.' })
      );
    }

    return admin;
  }
}
