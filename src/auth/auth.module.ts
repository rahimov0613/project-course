import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './guard/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports:[UsersModule,JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '15m' },
  })],
  controllers: [AuthController,],
  providers: [AuthService,JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard, 
    }
  ],
})
export class AuthModule {} 
