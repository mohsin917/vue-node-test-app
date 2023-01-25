import { forwardRef, Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { OpenHouseModule } from '../openHouse/openHouse.module';

@Module({
  imports: [
    forwardRef(() => OpenHouseModule),
  ],
  controllers: [
    PropertyController,
  ],
  providers: [
    PropertyService,
  ],
  exports: [PropertyService]
})
export class PropertyModule { }
