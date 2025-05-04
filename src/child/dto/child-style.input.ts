import { ChildStyleEntity } from '@libs/entity';
import { Field, Float, InputType, Int, PickType } from '@nestjs/graphql';
import { BackgroundType } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class ChildStyleInput extends PickType(ChildStyleEntity, [
  'width',
  'height',
  'margin',
  'padding',
  'background',
  'backgroundType',
  'border',
  'borderRadius',
  'titleSize',
  'titleColor',
  'titleLineHeight',
  'titleMargin',
  'contentSize',
  'contentColor',
  'contentLineHeight',
  'contentMargin',
]) {
  @Field({ description: '너비', nullable: true })
  @IsString({ message: '올바른 형식의 너비를 입력해주세요.' })
  @IsOptional()
  width: string | null;

  @Field({ description: '높이', nullable: true })
  @IsString({ message: '올바른 형식의 높이를 입력해주세요.' })
  @IsOptional()
  height: string | null;

  @Field({ description: '마진', nullable: true })
  @IsString({ message: '올바른 형식의 마진을 입력해주세요.' })
  @IsOptional()
  margin: string | null;

  @Field({ description: '패딩', nullable: true })
  @IsString({ message: '올바른 형식의 패딩을 입력해주세요.' })
  @IsOptional()
  padding: string | null;

  @Field({ description: '배경', nullable: true })
  @IsString({ message: '올바른 형식의 배경을 입력해주세요.' })
  @IsOptional()
  background: string | null;

  @Field(() => BackgroundType, { description: '배경 종류', nullable: true })
  @IsEnum(BackgroundType, {
    message: '올바른 형식의 배경 종류를 입력해주세요.',
  })
  @IsOptional()
  backgroundType: BackgroundType | null;

  @Field({ description: '테두리', nullable: true })
  @IsString({ message: '올바른 형식의 테두리을 입력해주세요.' })
  @IsOptional()
  border: string | null;

  @Field({ description: '테두리 곡률', nullable: true })
  @IsString({ message: '올바른 형식의 테두리 곡률을 입력해주세요.' })
  @IsOptional()
  borderRadius: string | null;

  // 제목
  @Field({ description: '제목 크기', nullable: true })
  @IsString({ message: '올바른 형식의 제목 크기를 입력해주세요.' })
  @IsOptional()
  titleSize: string | null;

  @Field({ description: '제목 색상', nullable: true })
  @IsString({ message: '올바른 형식의 제목 색상을 입력해주세요.' })
  @IsOptional()
  titleColor: string | null;

  @Field(() => Float, { description: '제목 줄 높이', nullable: true })
  @IsOptional()
  titleLineHeight: number | null;

  @Field({ description: '제목 마진', nullable: true })
  @IsString({ message: '올바른 형식의 제목 마진을 입력해주세요.' })
  @IsOptional()
  titleMargin: string | null;

  // 내용
  @Field({ description: '내용 크기', nullable: true })
  @IsString({ message: '올바른 형식의 내용 크기를 입력해주세요.' })
  @IsOptional()
  contentSize: string | null;

  @Field({ description: '내용 색상', nullable: true })
  @IsString({ message: '올바른 형식의 내용 색상을 입력해주세요.' })
  @IsOptional()
  contentColor: string | null;

  @Field(() => Float, { description: '내용 줄 높이', nullable: true })
  @IsOptional()
  contentLineHeight: number | null;

  @Field({ description: '내용 마진', nullable: true })
  @IsString({ message: '올바른 형식의 내용 마진을 입력해주세요.' })
  @IsOptional()
  contentMargin: string | null;
}
