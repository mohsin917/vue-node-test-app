import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { BaseService } from 'src/core/base/base.service';
import { UpdateAdminDto, AdminDto } from './adminDto/admin.dto';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/entities/admin.entity';

@Injectable()
export class AdminService extends BaseService {
  constructor() {
    super(Admin)
  }

  /**
   * @description Used to create admin
   * @param payload Admin
   * @returns response
   */
  async createAdmin(payload: AdminDto) {
    const adminExists = await this.findByEmail(payload.email);
    if (adminExists) {
      return { status: "error", message: "Admin already exists with this email" };
    }
    const hashPass = await bcrypt.hash(payload.password, 10);
    const newAdmin = await this.create({ ...payload, password: hashPass });
    const { password, ...result } = newAdmin['dataValues'];
    return { status: "success", message: "Admin created successfully" };
  }

  /**
   * Used to get all admin list
   * @param payload string | object
   */
  async list(payload: any) {
    const adminList = await this.findAll(payload);
    return adminList ? { status: "success", data: adminList.map((admin: AdminDto) => { delete admin['dataValues'].password; return admin['dataValues'] }) } : { status: "error", data: [] };
  }

  /**
   * @description Used to find admin by email
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
  async findAdminById(id: number) {
    const adminInDB = await this.findOneById(id);
    delete adminInDB['dataValues'].password;
   
    return adminInDB ?
      { status: "success", message: "Admin detail", data: adminInDB } :
      { status: "error", message: "Unable to get admin data" };;
  }

  /**
   * 
   * @param id 
   * @param payload 
   * @returns 
   */
  async UpdateAdmin(id: number, payload: UpdateAdminDto) {
    const isEmailAlreadyTaken = await this.findOne({ email: payload.email, id: { [Op.not]: id } });

    if (!isEmailAlreadyTaken) {
      const adminExists = await this.findOneById(id);
      if (adminExists) {
        const updateResponse = await this.update({ id }, payload);
        return updateResponse[0] ?
          { status: "success", message: "Admin updated successfully" } :
          { status: "error", message: "Admin not updated" };
      } else {
        return { status: "error", message: "Admin does not exist" };
      }
    }
    else {
      return { status: "error", message: "This email already exist" };
    }
  }

  async deleteAdmin(id: number) {
    const deleteResponse = await this.deleteById(id);
    return deleteResponse ?
      { status: "success", message: "Admin updated successfully" } :
      { status: "error", message: "Admin not updated" };
  }
}
