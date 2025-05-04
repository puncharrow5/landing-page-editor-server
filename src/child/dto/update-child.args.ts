import { Int, Field, PickType, ArgsType } from '@nestjs/graphql';
import { ChildEntity } from '@libs/entity';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ChildStyleInput } from './child-style.input';

@ArgsType()
export class UpdateChildArgs extends PickType(ChildEntity, [
  'id',
  'title',
  'content',
]) {
  @Field(() => Int, { description: 'ID' })
  @IsInt({ message: '올바른 형식의 컴포넌트 ID를 입력해주세요.' })
  id: number;

  @Field({ description: '제목', nullable: true })
  @IsString({ message: '올바른 형식의 제목을 입력해주세요.' })
  @IsOptional()
  title: string | null;

  @Field({ description: '내용', nullable: true })
  @IsString({ message: '올바른 형식의 내용을 입력해주세요.' })
  @IsOptional()
  content: string | null;

  @Field(() => ChildStyleInput, {
    description: '스타일',
    nullable: true,
  })
  @ValidateNested({ each: true })
  @Type(() => ChildStyleInput)
  @IsOptional()
  childStyle: ChildStyleInput | null;
}
