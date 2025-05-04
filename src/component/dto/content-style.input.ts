import { ContentStyleEntity } from '@libs/entity';
import { Field, Float, InputType, Int, PickType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class ContentStyleInput extends PickType(ContentStyleEntity, [
  'margin',
  'mobileMargin',
  'size',
  'mobileSize',
  'lineHeight',
  'mobileLineHeight',
  'mobileColor',
]) {
  @Field({ description: '마진', nullable: true })
  @IsString({ message: '올바른 형식의 마진을 입력해주세요.' })
  @IsOptional()
  margin: string | null;

  @Field({ description: '모바일 마진', nullable: true })
  @IsString({ message: '올바른 형식의 모바일 마진을 입력해주세요.' })
  @IsOptional()
  mobileMargin: string | null;

  @Field({ description: '텍스트 크기', nullable: true })
  @IsString({ message: '올바른 형식의 텍스트 크기를 입력해주세요.' })
  @IsOptional()
  size: string | null;

  @Field({ description: '모바일 텍스트 크기', nullable: true })
  @IsString({ message: '올바른 형식의 모바일 텍스트 크기를 입력해주세요.' })
  @IsOptional()
  mobileSize: string | null;

  @Field(() => Float, { description: '줄 높이', nullable: true })
  @IsOptional()
  lineHeight: number | null;

  @Field(() => Float, { description: '모바일 줄 높이', nullable: true })
  @IsOptional()
  mobileLineHeight: number | null;

  @Field({ description: '텍스트 색상', nullable: true })
  @IsString({ message: '' })
  @IsOptional()
  color: string | null;

  @Field({ description: '모바일 텍스트 색상', nullable: true })
  @IsString({ message: '' })
  @IsOptional()
  mobileColor: string | null;
}
