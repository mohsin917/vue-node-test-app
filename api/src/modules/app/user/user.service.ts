import { Injectable } from '@nestjs/common';
import { User } from '../../../entities';
import { Op } from 'sequelize';
import { BaseService } from 'src/core/base/base.service';
import { UserDto } from './userDto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends BaseService {
  constructor() {
    super(User)
  }

  /**
   * @description Used to create user
   * @param payload User
   * @returns response
   */
  async createUser(payload: UserDto) {
    const userExist = await this.findByName(payload.name);
    if (userExist) {
      return { status: "error", message: "User already exists with this name" };
    }
    const newUser = await this.create(payload);
    
    return { status: "success", message: "User created successfully" , data: newUser };
  }

  /**
   * Used to get all user list
   * @param payload string | object
   */
  async list(payload: any) {
    const users = await this.findAll(payload);
    return users ? { status: "success", data: users.map((user: UserDto) => { delete user['dataValues'].password; return user['dataValues'] }) } : { status: "error", data: [] };
  }

    /**
   * @description Used to find user by email
   * @param email string
   * @returns response
   */
     async findByName(name: string) {
      return this.findOne({ name: name });
    }

  /**
   * @description Used to find user by email
   * @param email string
   * @returns response
   */
  async findByEmail(email: string) {
    return this.findOne({ email: email });
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async findUserById(id: number) {
    const userInDB = await this.findOneById(id)
    return userInDB ?
      { status: "success", message: "User detail", data: userInDB } :
      { status: "error", message: "Unable to get user data" };;
  }

  /**
   * 
   * @param id 
   * @param payload 
   * @returns 
   */
  async UpdateUser(id: number, payload: UserDto) {
    const isNameAlreadyTaken = await this.findOne({ name: payload.name, id: { [Op.not]: id } });

    if (!isNameAlreadyTaken) {
      const userExist = await this.findOneById(id);
      if (userExist) {
        const updateResponse = await this.update({ id }, payload);
        return updateResponse[0] ?
          { status: "success", message: "User updated successfully" } :
          { status: "error", message: "User not updated" };
      } else {
        return { status: "error", message: "User does not exist" };
      }
    }
    else {
      return { status: "error", message: "This email already exist" };
    }
  }

  async deleteUser(id: number) {
    const deleteResponse = await this.deleteById(id);
    return deleteResponse ?
      { status: "success", message: "User updated successfully" } :
      { status: "error", message: "User not updated" };
  }
}
