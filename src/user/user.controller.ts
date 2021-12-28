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
import { Response, Request } from 'express';
import { loginDto, registerDto, userEditDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get('/search/:id')
  async getUser(@Param() id: string) {
    return this.userService.getUser(id);
  }

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

  @Post('/register')
  async register(@Body() User: registerDto) {
    await this.userService.register(User);
    return { message: 'done', status: 201 };
  }

  @Post('/edit')
  async profileEdit(@Body() data: userEditDto, @Req() req: Request) {
    this.userService.userEdit(data, req.cookies['access_token']);
  }

  @Put('/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.send('fuck');
  }
}
