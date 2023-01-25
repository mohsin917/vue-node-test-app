import { Injectable } from '@nestjs/common';
import { Property } from '../../../entities';
import { Op } from 'sequelize';
import { BaseService } from 'src/core/base/base.service';
import { PropertyDto } from './propertyDto/property.dto';
import * as bcrypt from 'bcrypt';
import { OpenHouseService } from '../openHouse/openHouse.service';

@Injectable()
export class PropertyService extends BaseService {
  constructor(private _openHouseService: OpenHouseService) {
    super(Property)
  }

  /**
   * @description Used to create property
   * @param payload property
   * @returns response
   */
  async createProperty(payload: PropertyDto) {
    const propertyExists = await this.findOne({ address: payload.address });
    if (propertyExists) {
      return { status: "error", message: "Property already exists with this address" };
    }

    const newProperty = await this.create(payload);
    return { status: "success", message: "Property created successfully", data: newProperty };
  }

  /**
   * Used to get all property list
   * @param payload string | object
   */
  async list(payload: any) {
    const properties = await this.findAll(payload, [['id', 'ASC']]);
    return properties ? { status: "success", data: properties } : { status: "error", data: [] };
  }

  /**
   * @description Used to find property by email
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
  async findPropertyById(id: number) {
    const propertyInDB = await this.findOneById(id)
    return propertyInDB ?
      { status: "success", message: "Property detail", data: propertyInDB } :
      { status: "error", message: "Unable to get Property data" };;
  }

  /**
   * 
   * @param id 
   * @param payload 
   * @returns 
   */
  async UpdateProperty(id: number, payload: PropertyDto) {
    const isAddressTaken = await this.findOne({ address: payload.address, id: { [Op.not]: id } });

    if (!isAddressTaken) {
      const propertyExists = await this.findOneById(id);
      if (propertyExists) {
        const updateResponse = await this.update({ id }, payload);
        return updateResponse[0] ?
          { status: "success", message: "Property updated successfully" } :
          { status: "error", message: "Property not updated" };
      } else {
        return { status: "error", message: "Property does not exist" };
      }
    }
    else {
      return { status: "error", message: "This email already exist" };
    }
  }

  async deleteProperty(id: number) {
    const deleteResponse = await this.deletePropertyById(id);
    return deleteResponse ?
      { status: "success", message: "Property deleted successfully" } :
      { status: "error", message: "Property not deleted" };
  }

  async deletePropertyById(id: number) {
    const openHouses = await this._openHouseService.findAll({ propertyId: id });
    for (let houseIndex = 0; houseIndex < openHouses.length; houseIndex++) {
      const element = openHouses[houseIndex].dataValues;
      await this._openHouseService.deleteHouseById(element.id);
    }
    const deleteResponse = await this.deleteById(id);
    return deleteResponse;
  }
}
