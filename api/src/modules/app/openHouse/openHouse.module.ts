import { forwardRef, Module } from '@nestjs/common';
import { OpenHouseDetailModule } from '../openHouseDetail/openHouseDetail.module';
import { OpenHouseController } from './openHouse.controller';
import { OpenHouseService } from './openHouse.service';

@Module({
  imports: [
    forwardRef(() => OpenHouseDetailModule)
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
