import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService : UserService) {}
  @Post('/login')
  GetToken(@Body() User) {
    console.log("hi" , User);
    this.userService.pushData(User)
    
    return "hi";
  }
}
