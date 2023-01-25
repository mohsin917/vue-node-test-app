import { Column, DataType, HasMany, BelongsToMany, Model, Table } from "sequelize-typescript";

@Table({
	modelName: 'tbl_admins'
})
export class Admin extends Model<Admin>{
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	name: string;

	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	email: string;

	@Column({
		type: DataType.STRING,
	})
	password: string;

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