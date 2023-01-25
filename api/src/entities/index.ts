import { Admin } from './admin.entity';
import { OpenHouse } from './openHouse.entity';
import { OpenHouseDetail } from './openHouseDetails.entity';
import { Property } from './property.entity';
import { User } from './user.entity'

const entities = [
  User,
  Admin,
  OpenHouse,
  Property,
  OpenHouseDetail
];

export {
  User,
  Admin,
  OpenHouse,
  Property,
  OpenHouseDetail
}
export default entities