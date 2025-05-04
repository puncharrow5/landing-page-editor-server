import { Int, Field, PickType, ArgsType } from '@nestjs/graphql';
import { MobileHeaderEntity } from '@libs/entity';
import { IsInt, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class UpdateMobileHeaderArgs extends PickType(MobileHeaderEntity, [
  'siteId',
  'logo',
  'logoSize',
  'button',
  'buttonSize',
  'height',
  'padding',
  'menuPadding',
  'backgroundColor',
  'menuBackgroundColor',
  'textSize',
  'textColor',
]) {
  @Field(() => Int, { description: '사이트 ID' })
  @IsInt({ message: '올바른 형식의 사이트 ID를 입력해주세요.' })
  siteId: number;

  @Field({ description: '로고', nullable: true })
  @IsString({ message: '올바른 형식의 로고 사이즈를 입력해주세요.' })
  @IsOptional()
  logo: string | null;

  @Field({ description: '로고 사이즈', nullable: true })
  @IsString({ message: '올바른 형식의 로고 사이즈를 입력해주세요.' })
  @IsOptional()
  logoSize: string | null;

  @Field({ description: '버튼', nullable: true })
  @IsString({ message: '올바른 형식의 버튼 사이즈를 입력해주세요.' })
  @IsOptional()
  button: string | null;

  @Field({ description: '버튼 사이즈', nullable: true })
  @IsString({ message: '올바른 형식의 버튼 사이즈를 입력해주세요.' })
  @IsOptional()
  buttonSize: string | null;

  @Field({ description: '헤더 높이', nullable: true })
  @IsString({ message: '올바른 형식의 헤더 높이를 입력해주세요.' })
  @IsOptional()
  height: string | null;

  @Field({ description: '패딩', nullable: true })
  @IsString({ message: '올바른 형식의 패딩을 입력해주세요.' })
  @IsOptional()
  padding: string | null;

  @Field({ description: '매뉴 패딩', nullable: true })
  @IsString({ message: '올바른 형식의 메뉴 패딩을 입력해주세요.' })
  @IsOptional()
  menuPadding: string | null;

  @Field({ description: '배경 색상', nullable: true })
  @IsString({ message: '올바른 형식의 배경 색상을 입력해주세요.' })
  @IsOptional()
  backgroundColor: string | null;

  @Field({ description: '메뉴 배경 색상', nullable: true })
  @IsString({ message: '올바른 형식의 배경 색상을 입력해주세요.' })
  @IsOptional()
  menuBackgroundColor: string | null;

  @Field({ description: '텍스트 크기', nullable: true })
  @IsString({ message: '올바른 형식의 텍스트 크기을 입력해주세요.' })
  @IsOptional()
  textSize: string | null;

  @Field({ description: '텍스트 색상', nullable: true })
  @IsString({ message: '올바른 형식의 텍스트 색상을 입력해주세요.' })
  @IsOptional()
  textColor: string | null;
}
