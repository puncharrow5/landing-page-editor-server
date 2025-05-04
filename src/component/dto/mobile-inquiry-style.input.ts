import { MobileInquiryStyleEntity } from '@libs/entity';
import { Field, Float, InputType, Int, PickType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class MobileInquiryStyleInput extends PickType(
  MobileInquiryStyleEntity,
  [
    'padding',
    'gap',
    'textSize',
    'textColor',
    'lineHeight',
    'backgroundColor',
    'buttonWidth',
    'buttonHeight',
    'buttonTextSize',
    'buttonTextColor',
    'buttonColor',
    'buttonRadius',
  ],
) {
  @Field({ description: '패딩', nullable: true })
  @IsString({ message: '올바른 형식의 패딩을 입력해주세요.' })
  @IsOptional()
  padding: string | null;

  @Field({ description: '갭', nullable: true })
  @IsString({ message: '올바른 형식의 갭을 입력해주세요.' })
  @IsOptional()
  gap: string | null;

  @Field({ description: '텍스트 크기', nullable: true })
  @IsString({ message: '올바른 형식의 텍스트 크기를 입력해주세요.' })
  @IsOptional()
  textSize: string | null;

  @Field({ description: '텍스트 색상', nullable: true })
  @IsString({ message: '올바른 형식의 텍스트 색상을 입력해주세요.' })
  @IsOptional()
  textColor: string | null;

  @Field(() => Float, { description: '줄 높이', nullable: true })
  @IsOptional()
  lineHeight: number;

  @Field({ description: '배경 색상', nullable: true })
  @IsString({ message: '올바른 형식의 배경 색상을 입력해주세요.' })
  @IsOptional()
  backgroundColor: string | null;

  // 버튼
  @Field({ description: '버튼 너비', nullable: true })
  @IsString({ message: '올바른 형식의 버튼 너비비를 입력해주세요.' })
  @IsOptional()
  buttonWidth: string | null;

  @Field({ description: '버튼 높이', nullable: true })
  @IsString({ message: '올바른 형식의 버튼 높이를 입력해주세요.' })
  @IsOptional()
  buttonHeight: string | null;

  @Field({ description: '버튼 텍스트 크기', nullable: true })
  @IsString({ message: '올바른 형식의 버튼 텍스트 크기를 입력해주세요.' })
  @IsOptional()
  buttonTextSize: string | null;

  @Field({ description: '버튼 텍스트 색상', nullable: true })
  @IsString({ message: '올바른 형식의 버튼 텍스트 색상을 입력해주세요.' })
  @IsOptional()
  buttonTextColor: string | null;

  @Field({ description: '버튼 텍스트 색상', nullable: true })
  @IsString({ message: '올바른 형식의 버튼 색상을 입력해주세요.' })
  @IsOptional()
  buttonColor: string | null;

  @Field({ description: '버튼 텍스트 색상', nullable: true })
  @IsString({ message: '올바른 형식의 버튼 곡률을 입력해주세요.' })
  @IsOptional()
  buttonRadius: string | null;
}
