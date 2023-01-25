import { Column, DataType, HasMany, BelongsToMany, Model, Table } from "sequelize-typescript";

@Table({
	modelName: 'tbl_properties'
})
export class Property extends Model<Property>{
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	address: string;

	@Column({
		type: DataType.TEXT,
		unique: true,
		allowNull: false,
	})
	description: string;

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