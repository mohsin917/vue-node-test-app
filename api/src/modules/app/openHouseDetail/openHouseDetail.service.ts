import { Injectable } from '@nestjs/common';
import { OpenHouse, Property } from '../../../entities';
import { Op } from 'sequelize';
import { BaseService } from 'src/core/base/base.service';
import { OpenHouseDetail } from 'src/entities/openHouseDetails.entity';
import { OpenHouseDetailDto, UpdateOpenHouseDetailDto } from './openHouseDetailDto/openHouseDetail.dto';

@Injectable()
export class OpenHouseDetailService extends BaseService {
  constructor() {
    super(OpenHouseDetail)
  }

  /**
   * @description Used to create OpenHouse
   * @param payload OpenHouse
   * @returns response
   */
  async createDetailHouse(payload: OpenHouseDetailDto) {
    // const houseExists = await this.findHouseByPropertyId(Number(payload.propertyId));
    // if (houseExists) {
    //   return { status: "error", message: "House already exists with this Property" };
    // }
    const record = {
      propertyId : Number(payload.propertyId),
      tenantAmount : Number(payload.tenantAmount),
      openHouseId :  Number(payload.houseId),
      userId: Number(payload.userId)
    }
    const newHouse = await this.create(record );

    return { status: "success", message: "House enrolled created successfully" , data: newHouse};
  }

  /**
   * Used to get all House list
   * @param payload string | object
   */
  async list(payload: any) {
    const houses = await this.findAll(payload,[['id', 'ASC']], [
      {model: Property}
    ]);
    return houses ? { status: "success", data: houses } : { status: "error", data: [] };
  }


  /**
   * 
   * @param propertyId 
   * @returns 
   */
   async findHouseByPropertyId(propertyId: number) {
    return await this.findOne({propertyId:propertyId})
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async findHouseById(id: number) {
    const houseInDB = await this.findOneById(id,[ {model: Property}])
    return houseInDB ?
      { status: "success", message: "Open House detail", data: houseInDB } :
      { status: "error", message: "Unable to get Open House data" };;
  }

  /**
   * 
   * @param id 
   * @param payload 
   * @returns 
   */
  async UpdateHouse(id: number, payload: UpdateOpenHouseDetailDto) {
    const isEmailAlreadyTaken = await this.findOne({ id: payload });

    if (!isEmailAlreadyTaken) {
      const houseExists = await this.findOneById(id);
      if (houseExists) {
        const updateResponse = await this.update({ id }, payload);
        return updateResponse[0] ?
          { status: "success", message: "House updated successfully" } :
          { status: "error", message: "House not updated" };
      } else {
        return { status: "error", message: "Open House does not exist" };
      }
    }
    else {
      return { status: "error", message: "This email already exist" };
    }
  }

  async deleteHouse(id: number) {
    const deleteResponse = await this.deleteHouseDetailById(id);
    return deleteResponse ?
      { status: "success", message: "House updated successfully" } :
      { status: "error", message: "House not updated" };
  }

  async deleteHouseDetailById(id: number) {
    const deleteResponse = await this.deleteById(id);
    return deleteResponse;
  }
}
