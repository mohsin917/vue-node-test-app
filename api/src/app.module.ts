import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './core/providers/database.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { ImageModule } from './modules/image/image.module';
import { RoofUsModule } from './modules/app/roofUs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    MailModule,
    ImageModule,
    RoofUsModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
  exports: [
  ]
})
export class AppModule { }
