import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { MailModule } from 'src/mail/mail.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    forwardRef(() => MailModule),
  ],
  controllers: [
    AdminController,
  ],
  providers: [
    AdminService,
  ],
  exports: [AdminService]
})
export class AdminModule { }
