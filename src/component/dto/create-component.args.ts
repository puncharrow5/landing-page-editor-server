import { Int, Field, PickType, ArgsType } from '@nestjs/graphql';
import { ComponentEntity } from '@libs/entity';
import { ComponentType } from '@prisma/client';
import { IsEnum, IsInt, IsString } from 'class-validator';

@ArgsType()
export class CreateComponentArgs extends PickType(ComponentEntity, [
  'siteId',
  'componentType',
  'name',
]) {
  @Field(() => Int, { description: '사이트 ID' })
  @IsInt({ message: '올바른 형식의 사이트 ID를 입력해주세요.' })
  siteId: number;

  @Field(() => ComponentType, { description: '컴포넌트 종류' })
  @IsEnum(ComponentType, {
    message: '올바른 형식의 컴포넌트 종류를 입력해주세요.',
  })
  componentType: ComponentType;

  @Field({ description: '컴포넌트 이름' })
  @IsString({ message: '올바른 형식의 컴포넌트 이름을 입력해주세요.' })
  name: string;
}
