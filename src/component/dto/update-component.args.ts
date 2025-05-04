import { Int, Field, PickType, ArgsType } from '@nestjs/graphql';
import { ComponentEntity } from '@libs/entity';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TitleStyleInput } from './title-style.input';
import { ContentStyleInput } from './content-style.input';
import { ComponentStyleInput } from './component-style.input';
import { ComponentMobileStyleInput } from './component-mobile-style.input';
import { InquiryStyleInput } from './inquiry-style.input';
import { MobileInquiryStyleInput } from './mobile-inquiry-style.input';

@ArgsType()
export class UpdateComponentArgs extends PickType(ComponentEntity, [
  'id',
  'name',
  'title',
  'mobileTitle',
  'content',
  'mobileContent',
]) {
  @Field(() => Int, { description: 'ID' })
  @IsInt({ message: '올바른 형식의 컴포넌트 ID를 입력해주세요.' })
  id: number;

  @Field({ description: '이름' })
  @IsString({ message: '올바른 형식의 이름을 입력해주세요.' })
  name: string;

  @Field({ description: '제목', nullable: true })
  @IsString({ message: '올바른 형식의 제목을 입력해주세요.' })
  @IsOptional()
  title: string | null;

  @Field({ description: '모바일 제목', nullable: true })
  @IsString({ message: '올바른 형식의 제목을 입력해주세요.' })
  @IsOptional()
  mobileTitle: string | null;

  @Field({ description: '내용', nullable: true })
  @IsString({ message: '올바른 형식의 내용을 입력해주세요.' })
  @IsOptional()
  content: string | null;

  @Field({ description: '모바일 내용', nullable: true })
  @IsString({ message: '올바른 형식의 내용을 입력해주세요.' })
  @IsOptional()
  mobileContent: string | null;

  @Field(() => ComponentStyleInput, {
    description: '컴포넌트 스타일',
    nullable: true,
  })
  @ValidateNested({ each: true })
  @Type(() => ComponentStyleInput)
  @IsOptional()
  componentStyle: ComponentStyleInput | null;

  @Field(() => ComponentMobileStyleInput, {
    description: '컴포넌트 모바일 스타일',
    nullable: true,
  })
  @ValidateNested({ each: true })
  @Type(() => ComponentMobileStyleInput)
  @IsOptional()
  componentMobileStyle: ComponentMobileStyleInput | null;

  @Field(() => TitleStyleInput, { description: '제목 스타일', nullable: true })
  @ValidateNested({ each: true })
  @Type(() => TitleStyleInput)
  @IsOptional()
  titleStyle: TitleStyleInput | null;

  @Field(() => ContentStyleInput, {
    description: '내용 스타일',
    nullable: true,
  })
  @ValidateNested({ each: true })
  @Type(() => ContentStyleInput)
  @IsOptional()
  contentStyle: ContentStyleInput | null;

  @Field(() => InquiryStyleInput, {
    description: '문의 스타일',
    nullable: true,
  })
  @ValidateNested({ each: true })
  @Type(() => InquiryStyleInput)
  @IsOptional()
  inquiryStyle: InquiryStyleInput | null;

  @Field(() => MobileInquiryStyleInput, {
    description: '모바일 문의 스타일',
    nullable: true,
  })
  @ValidateNested({ each: true })
  @Type(() => MobileInquiryStyleInput)
  @IsOptional()
  mobileInquiryStyle: MobileInquiryStyleInput | null;
}
