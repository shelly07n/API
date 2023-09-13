/* eslint-disable prettier/prettier */
import sequelize, { InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";

@Table({ tableName: "User" })
export class User extends Model<InferCreationAttributes<User>, InferAttributes<User>> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;


    @Column
    name: string;

    @Column
    password: string;

  
}
