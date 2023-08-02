import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { AuthUserType } from './types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return await this.userService.getAll();
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@AuthUser() user: AuthUserType) {
    return await this.userService.getProfile(user.id);
  }
}
