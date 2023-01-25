import { Column, DataType, HasMany, BelongsToMany, Model, Table } from "sequelize-typescript";

@Table({
	modelName: 'tbl_users'
})
export class User extends Model<User>{
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	name: string;

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