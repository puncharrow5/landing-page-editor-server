import { IsString } from 'class-validator';

export class GetFileParam {
  @IsString({ message: '올바른 파일명을 입력해주세요.' })
  name: string;
}
