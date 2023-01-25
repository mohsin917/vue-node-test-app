import { forwardRef, Module } from '@nestjs/common';
import { OpenHouseController } from './openHouse.controller';
import { OpenHouseService } from './openHouse.service';

@Module({
  imports: [
  ],
  controllers: [
    OpenHouseController,
  ],
  providers: [
    OpenHouseService,
  ],
  exports: [OpenHouseService]
})
export class OpenHouseModule { }
