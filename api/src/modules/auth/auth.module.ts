import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from '../app/admin/admin.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: 'ROOFUS_secrect_key_2023',
      signOptions: { expiresIn: '8h' },
    }),
    forwardRef(() => AdminModule)
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  controllers: [
    AuthController,
  ],
  exports: [
    PassportModule,
    JwtModule,
  ],
})
export class AuthModule { }