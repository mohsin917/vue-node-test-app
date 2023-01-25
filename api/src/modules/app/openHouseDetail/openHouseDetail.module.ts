import { forwardRef, Module } from '@nestjs/common';
import { OpenHouseDetailController } from './openHouseDetail.controller';
import { OpenHouseDetailService } from './openHouseDetail.service';

@Module({
  imports: [
  ],
  controllers: [
    OpenHouseDetailController,
  ],
  providers: [
    OpenHouseDetailService,
  ],
  exports: [OpenHouseDetailService]
})
export class OpenHouseDetailModule { }
