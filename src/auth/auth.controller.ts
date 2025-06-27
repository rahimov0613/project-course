import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { loginAuthDto} from './dto/login-auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto:RegisterAuthDto, @Res({passthrough:true})res:Response){
    const {accessToken,refreshToken} = await this.authService.register(dto)
    res.cookie('refresh_token',refreshToken,{
      httpOnly:true,
      secure:false
    });
    return { accessToken, refreshToken }
  }

  @Post('login')
  async login(@Body() dto: loginAuthDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(dto);
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
    });
    return { accessToken, refreshToken };
  } 
  @Post('refresh')
  async refresh(@Req() req:Request){
    const refreshToken = req.cookies['refresh_token'];
    return this.authService.refresh(refreshToken)
  }
} 
