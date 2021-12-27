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
import { tokenDto, userEditDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get('/:userid')
  async getUser(@Param() userid: string) {
    console.log('여긴 유저');
    return this.getUser(userid);
  }
  @Post('/login')
  async GetToken(
    @Body() User: tokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const sub = await this.userService.pushData(User);
    const jwt = await this.jwtService.sign({ sub });
    res.cookie('access_token', jwt);
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
