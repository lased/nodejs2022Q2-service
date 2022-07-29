import { Controller, Post, Body, HttpCode } from '@nestjs/common';

import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  signup(@Body() signupAuthDto: SignupAuthDto) {
    return this.authService.signup(signupAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('refresh')
  refresh(
    @Body()
    refreshAuthDto: RefreshAuthDto,
  ) {
    return this.authService.refresh(refreshAuthDto);
  }
}
