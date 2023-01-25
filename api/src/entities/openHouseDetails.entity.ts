import { Column, DataType, HasMany, BelongsToMany, Model, Table, BelongsTo, ForeignKey } from "sequelize-typescript";
import { OpenHouse } from "./openHouse.entity";
import { Property } from "./property.entity";
import { User } from "./user.entity";

@Table({
  modelName: 'tbl_open_house_details'
})
export class OpenHouseDetail extends Model<OpenHouseDetail>{
  @ForeignKey(() => OpenHouse)
  @Column({
    type: DataType.BIGINT,
    field: 'open_house_id'
  })
  openHouseId: number;
  @BelongsTo(() => OpenHouse)
  openHouse: OpenHouse

  @ForeignKey(() => Property)
  @Column({
    type: DataType.BIGINT,
    field: 'property_id'
  })
  propertyId: number;
  @BelongsTo(() => Property)
  property: Property

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    field: 'user_id'
  })
  userId: number;
  @BelongsTo(() => User)
  users: User

  @Column({
    type: DataType.INTEGER,
    field: 'tenant_amount'
  })
  tenantAmount: number;
  
  @Column({
    type: DataType.INTEGER,
    field: 'created_by'
  })
  createdBy: number;

  @Column({
    type: DataType.INTEGER,
    field: 'updated_by'
  })
  updatedBy: number;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

}