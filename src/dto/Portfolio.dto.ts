import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class PortfolioDTO {
  @ApiProperty({
    title: '포트폴리오의 제목',
    description: '포트폴리오의 제목입니다.',
    example: '티모가 귀여운 포트폴리오',
  })
  @IsString()
  title: string;

  @ApiProperty({
    title: '포트폴리오 태그',
    description: '포트폴리오에 달린 태그들 입니다.',
    example: 'Android, React, IOS, Nestjs',
  })
  @IsArray()
  tags: string[];

  @ApiProperty({
    title: '이미지 URL',
    description: '포트폴리오에 넣은 이미지의 URL입니다.',
    example: 'https://ibb.co/jMRZCmL',
  })
  @IsString()
  imgUrl: string;

  @ApiProperty({
    title: '포트폴리오 내용',
    description: '포트폴리오 작성시 포트폴리오의 내용입니다.',
    example:
      '<p>티모가 귀여운 이유를 설명하겠습니다<br>티모는 사랑스럽습니다<br>변찬우 천재</p>',
  })
  @IsString()
  contents: string;
}

export class PortfolioUpdateDTO {
  @ApiProperty({
    title: '포트폴리오 수정시 수정된 제목',
    description: '포트폴리오 수정시 수정된 제목 입니다.',
    example: '티모가 역겨운 포트폴리오',
  })
  @IsString()
  title: string;

  @ApiProperty({
    title: '포트폴리오 수정시 수정된 태그',
    description: '포트폴리오 수정시 수정된 태그 입니다.',
    example: 'Django, Spring, node.js',
  })
  @IsArray()
  tags: string[];

  @ApiProperty({
    title: '포트폴리오 수정시 바뀐 이미지',
    description: '포트폴리오 수정시 바뀐 이미지의 URL입니다.',
    example: 'https://ibb.co/JFvVDrV',
  })
  @IsString()
  imgUrl: string;

  @ApiProperty({
    title: '포트폴리오 수정시 바뀐 내용',
    description: '포트폴리오 수정시 바뀐 포트폴리오의 내용입니다.',
    example:
      '<p>티모가 역겨운 이유를 설명하겠습니다<br>티모는 사랑스럽습니다<br>변찬우 바보</p>',
  })
  @IsString()
  contents: string;
}
