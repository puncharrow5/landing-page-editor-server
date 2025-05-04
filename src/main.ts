import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GqlBadRequestExceptionFilter } from 'libs/filter/src';

/**
 * [maxFileSize]
 * 1) 10진수를 따름
 * 2) maxFileSize=14일 경우 14미만 조건임
 * 3) 배열로 파일이 들어오더라도 단일개의 파일 사이즈에 해당함
 */
const maxFileSize = 1000 * 1000 * 500;
const maxFiles = 220;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});

  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, '..', '..', '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', '..', '..', 'views'));
  app.setViewEngine('ejs');
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/graphql', graphqlUploadExpress({ maxFileSize, maxFiles }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // true일 경우 validation decorator가 붙어있지 않는 속성들은 제거
      forbidNonWhitelisted: false, // true일 경우 DTO에 존재하지 않는 값이 들어올 경우 에러, 이미지 경우 false로 해야 인식한다.
      transform: true, // 모든 데이터는 string으로 전달되는데 true일 경우 DTO에 도달할 때 형변환 시켜준다.
      stopAtFirstError: true, // 에러가 여러개일 경우 첫번째 메세지만 보내게 설정
      exceptionFactory: (errors) => {
        const firstError = errors[0];
        const firstMessage = Object.values(firstError.constraints ?? {})[0];
        return new BadRequestException(firstMessage);
      }, // 유효성 검사에서 에러가 여러개일 경우 첫번째 메세지만 보내게 설정
    }),
  );
  app.useGlobalFilters(new GqlBadRequestExceptionFilter());

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('랜딩 페이지 에디터 서버')
      .setDescription('API 명세서')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
