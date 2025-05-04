import { Int, Field, PickType, ArgsType, Float } from '@nestjs/graphql';
import { MobileFooterEntity } from '@libs/entity';
import { IsInt, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class UpdateMobileFooterArgs extends PickType(MobileFooterEntity, [
  'siteId',
  'footerType',
  'logo',
  'logoSize',
  'contentTop',
  'helpCenter',
  'terms',
  'contentBottom',
  'backgroundColor',
  'paddingTop',
  'paddingBottom',
  'textColor',
  'textSize',
  'lineHeight',
]) {
  @Field(() => Int, { description: '사이트 ID' })
  @IsInt({ message: '올바른 형식의 사이트 ID를 입력해주세요.' })
  siteId: number;

  @Field(() => Int, { description: '푸터 타입' })
  @IsInt({ message: '올바른 형식의 푸터 타입을 입력해주세요.' })
  footerType: number;

  @Field({ description: '로고', nullable: true })
  @IsString({ message: '올바른 형식의 로고 이미지를 입력해주세요.' })
  @IsOptional()
  logo: string | null;

  @Field({ description: '로고 사이즈', nullable: true })
  @IsString({ message: '올바른 형식의 로고 사이즈를 입력해주세요.' })
  @IsOptional()
  logoSize: string | null;

  @Field({ description: '상단 내용', nullable: true })
  @IsString({ message: '올바른 형식의 상단 내용을 입력해주세요.' })
  @IsOptional()
  contentTop: string | null;

  @Field({ description: '고객센터', nullable: true })
  @IsString({ message: '올바른 형식의 고객센터를 입력해주세요.' })
  @IsOptional()
  helpCenter: string | null;

  @Field({ description: '약관', nullable: true })
  @IsString({ message: '올바른 형식의 약관을 입력해주세요.' })
  @IsOptional()
  terms: string | null;

  @Field({ description: '하단 내용', nullable: true })
  @IsString({ message: '올바른 형식의 하단 내용을 입력해주세요.' })
  @IsOptional()
  contentBottom: string | null;

  @Field({ description: '배경 색상', nullable: true })
  @IsString({ message: '올바른 형식의 배경 색상을 입력해주세요.' })
  @IsOptional()
  backgroundColor: string | null;

  @Field({ description: '상단 패딩', nullable: true })
  @IsString({ message: '올바른 형식의 상단 패딩을 입력해주세요.' })
  @IsOptional()
  paddingTop: string | null;

  @Field({ description: '하단 패딩', nullable: true })
  @IsString({ message: '올바른 형식의 하단 패딩을 입력해주세요.' })
  @IsOptional()
  paddingBottom: string | null;

  @Field({ description: '텍스트 크기', nullable: true })
  @IsString({ message: '올바른 형식의 텍스트 크기을 입력해주세요.' })
  @IsOptional()
  textSize: string | null;

  @Field({ description: '텍스트 색상', nullable: true })
  @IsString({ message: '올바른 형식의 텍스트 색상을 입력해주세요.' })
  @IsOptional()
  textColor: string | null;

  @Field(() => Float, { description: '줄 높이', nullable: true })
  @IsOptional()
  lineHeight: number | null;
}
