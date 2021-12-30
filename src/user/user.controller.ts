import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { loginDto, registerDto, userEditDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({
    summary: '자신의 정보 가져오기',
    description: '자신의 정보를 가져옵니다',
  })
  @Get()
  async My(@Req() req: Request) {
    const token = req.cookies['access_token'];
    return this.userService.My(token);
  }

  @ApiOperation({
    summary: '다른 사용자 정보 가져오기',
    description: '다른 사용자 정보를 가져옵니다',
  })
  @Get('/search/:id')
  async getUser(@Param() id: string) {
    return this.userService.getUser(id);
  }

  @ApiOperation({
    summary: '로그인',
    description: 'google token을 받아서 token을 반환해 줍니다',
  })
  @Post('/login')
  async Login(
    @Body() User: loginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { portfolio, sub, email, ...data } = await this.userService.login(
      User,
    );

    const jwt = await this.jwtService.sign({ sub });

    res.cookie('access_token', jwt).send(data);
  }

  @ApiOperation({
    summary: '회원가입',
    description: 'google token과 id를 받아서 db에 저장합니다',
  })
  @Post('/register')
  async register(@Body() User: registerDto) {
    await this.userService.register(User);
    return { message: 'done', status: 201 };
  }

  @ApiOperation({
    summary: '사용자 수정',
    description: '전공과 자기소개를 수정합니다',
  })
  @Post('/edit')
  async profileEdit(@Body() data: userEditDto, @Req() req: Request) {
    this.userService.userEdit(data, req.cookies['access_token']);
  }

  @ApiOperation({
    summary: '로그아웃',
    description: 'cookie 값을 삭제합니다',
  })
  @Put('/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.send('fuck');
  }
}
