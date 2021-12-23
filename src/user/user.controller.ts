import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/login')
  GetToken(
    @Body() User: { TokenId: string; major: string[]; introduce: string },
  ) {
    console.log('hi', User);
    this.userService.pushData(User);

    return 'hi';
  }
}
