import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    await this.authService.signUp(signUpDto);
    return { message: 'Create user successfully.' };
  }

  @Post('/login')
  async signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    const data = await this.authService.signIn(signInDto);
    return {
      message: 'Login successfully.',
      data,
    };
  }
}
