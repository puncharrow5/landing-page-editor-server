import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(BadRequestException)
export class GqlBadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const originalError = exception.getResponse();

    let message = '입력값이 유효하지 않습니다.';

    if (
      typeof originalError === 'object' &&
      originalError !== null &&
      'message' in originalError
    ) {
      const extracted = originalError['message'];
      if (Array.isArray(extracted)) {
        message = extracted.join(', ');
      } else if (typeof extracted === 'string') {
        message = extracted;
      }
    }

    throw new GraphQLError(message, {
      extensions: {
        code: 'BAD_USER_INPUT',
        exception: originalError,
      },
    });
  }
}
