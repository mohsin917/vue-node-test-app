import { Injectable } from '@nestjs/common';
import { OpenHouse, OpenHouseDetail, Property } from '../../../entities';
import { Op } from 'sequelize';
import { BaseService } from 'src/core/base/base.service';
import * as bcrypt from 'bcrypt';
import { OpenHouseDto, UpdateOpenHouseDto } from './openHouseDto/openHouse.dto';
import { OpenHouseDetailService } from '../openHouseDetail/openHouseDetail.service';

@Injectable()
export class OpenHouseService extends BaseService {
  constructor(private _openHouseDetailService: OpenHouseDetailService) {
    super(OpenHouse)
  }

  /**
   * @description Used to create OpenHouse
   * @param payload OpenHouse
   * @returns response
   */
  async createHouse(payload: OpenHouseDto) {
    const houseExists = await this.findHouseByPropertyId(Number(payload.propertyId));
    if (houseExists) {
      return { status: "error", message: "House already exists with this Property" };
    }
    const record = {
      propertyId: Number(payload.propertyId),
      visitorAmount: Number(payload.visitorAmount),
      startDate: new Date(payload.startDate)
    }
    const newHouse = await this.create(record);

    return { status: "success", message: "House created successfully", data: newHouse };
  }

  /**
   * Used to get all House list
   * @param payload string | object
   */
  async list(payload: any) {
    const houses = await this.findAll(payload, [['id', 'ASC']], [
      { model: Property },
      { model: OpenHouseDetail }
    ]);

    for (let houseIndex = 0; houseIndex < houses.length; houseIndex++) {
      const house = houses[houseIndex];
      house.dataValues.openHouseTotalAmount = 0;
      for (let houseDetailIndex = 0; houseDetailIndex < house.openHouseDetails.length; houseDetailIndex++) {
        const openHouseDetail = house.openHouseDetails[houseDetailIndex];
        house.dataValues.openHouseTotalAmount += openHouseDetail.tenantAmount
      }
      delete house.dataValues.openHouseDetails
    }

    return houses ? { status: "success", data: houses } : { status: "error", data: [] };
  }


  /**
   * 
   * @param propertyId 
   * @returns 
   */
  async findHouseByPropertyId(propertyId: number) {
    return await this.findOne({ propertyId: propertyId })
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async findHouseById(id: number) {
    const houseInDB = await this.findOneById(id, [
      { model: Property },
      { model: OpenHouseDetail }
    ]);

    houseInDB.dataValues.openHouseTotalAmount = 0;
    for (let houseDetailIndex = 0; houseDetailIndex < houseInDB.dataValues.openHouseDetails.length; houseDetailIndex++) {
      const openHouseDetail = houseInDB.openHouseDetails[houseDetailIndex];
      houseInDB.dataValues.openHouseTotalAmount += openHouseDetail.tenantAmount
    }
    delete houseInDB.dataValues.openHouseDetails

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
  async UpdateHouse(id: number, payload: UpdateOpenHouseDto) {
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
    const deleteResponse = await this.deleteHouseById(id);
    return deleteResponse ?
      { status: "success", message: "House updated successfully" } :
      { status: "error", message: "House not updated" };
  }

  async deleteHouseById(id: number) {
    const openHouses = await this._openHouseDetailService.findAll({openHouseId: id});
    for (let houseIndex = 0; houseIndex < openHouses.length; houseIndex++) {
      const element = openHouses[houseIndex].dataValues;
      await this._openHouseDetailService.deleteHouseDetailById(element.id);
    }
    const deleteResponse = await this.deleteById(id);
    return deleteResponse;
  }
}
