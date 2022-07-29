import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthPayloadType } from './auth.types';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { MESSAGE } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(createAuthDto: SignupAuthDto) {
    const { id, login } = await this.usersService.create(createAuthDto);
    const refreshToken = this.generateRefreshToken({ userId: id, login });
    const accessToken = this.generateAccessToken({ userId: id, login });

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { id, login } = await this.usersService.findByLogin(
      loginAuthDto.login,
    );
    const refreshToken = this.generateRefreshToken({ userId: id, login });
    const accessToken = this.generateAccessToken({ userId: id, login });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshAuthDto: RefreshAuthDto) {
    try {
      const payload = await this.jwtService.verifyAsync<AuthPayloadType>(
        refreshAuthDto.refreshToken,
        {
          secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        },
      );
      const refreshToken = this.generateRefreshToken(payload);
      const accessToken = this.generateAccessToken(payload);

      return {
        accessToken,
        refreshToken,
      };
    } catch {
      throw new ForbiddenException(MESSAGE.FORBIDDEN);
    }
  }

  private generateAccessToken(payload: AuthPayloadType) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
    });
  }

  private generateRefreshToken(payload: AuthPayloadType) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
    });
  }
}
