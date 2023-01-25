import { Column, DataType, HasMany, BelongsToMany, Model, Table, BelongsTo, ForeignKey } from "sequelize-typescript";
import { OpenHouseDetail } from "./openHouseDetails.entity";
import { Property } from "./property.entity";

@Table({
  modelName: 'tbl_open_houses'
})
export class OpenHouse extends Model<OpenHouse>{
  @ForeignKey(() => Property)
  @Column({
    type: DataType.BIGINT,
    field: 'property_id'
  })
  propertyId: number;
  @BelongsTo(() => Property)
  property: Property

  @Column({
    field: 'visitor_amount',
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  visitorAmount: number;

  @Column({
    field: 'start_date',
    type: DataType.DATE,
    allowNull: false,
  })
  startDate: number;

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

  @HasMany(() =>OpenHouseDetail)
  openHouseDetails: OpenHouseDetail
}