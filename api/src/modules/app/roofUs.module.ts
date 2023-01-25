import { forwardRef, Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { OpenHouseModule } from './openHouse/openHouse.module';
import { OpenHouseDetailModule } from './openHouseDetail/openHouseDetail.module';
import { PropertyModule } from './property/property.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => OpenHouseModule),
    forwardRef(() => PropertyModule),
    forwardRef(() => UserModule),
    forwardRef(() => OpenHouseDetailModule)
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class RoofUsModule { }