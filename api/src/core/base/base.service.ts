import { Injectable } from '@nestjs/common';


/**
 * BaseService
 * 
 */
@Injectable()
export class BaseService {

  /**
   * Sequelize Schema Model
   */
  protected model: any;

  /**
   * 
   * @param model SequelizeSchemaModel
   */
  constructor(model: any) {
    this.model = model;
  }

  /**
   * Find one record by condition
   *
   * @param condition any
   * @returns Model
   */
  public findOne(condition: any, include?: any, attributes?: any, order?: any) {
    return this.model.findOne({
      where: condition, include: include, attributes: attributes, order: order
    },);
  }

  /**
   * Find one record by id
   *
   * @param id number
   * @returns Model
   */
  public findOneById(id: number, include?: any, attributes?: any, order?: any) {
    return this.findOne({ id: id }, include, attributes, order);
  }

  /**
   * Find or create 
   *
   * @param condition any
   * @param fields any
   * @returns Model
   */
  public findOrCreate(condition: any, fields: any) {
    return this.model.findOrCreate({ where: condition, defaults: fields });
  }

  /**
   * Find all by condition
   *
   * @param condition any
   * @returns Model
   */
  public findAll(condition: any, sortOrder?: any, include?: any, attributes?: any, limit?: number) {
    return this.model.findAll({
      where: condition,
      order: sortOrder,
      include: include,
      attributes: attributes,
      limit: limit
    });
  }

  /**
   * Find and count all by condition
   * @param condition any
   * @returns Model
   */
  public findAndCountAll(condition: any) {
    return this.model.findAndCountAll({ where: condition });
  }

  /**
   * Create new record.
   *
   * @param fields any
   * @returns Model
   */
  public create(fields: any) {
    return this.model.create(fields);
  }

  /**
   * Update record(s) by condition;
   *
   * @param condition any
   * @param fields any
   * @returns 
   */
  public update(condition: any, fields: any) {
    return this.model.update(fields, { where: condition })
  }

  /**
   * Update one record by id
   * @param id number
   * @param fields any
   * @returns 
   */
  public updateById(id: number, fields: any) {
    return this.update({ id: id }, fields);
  }

  /**
   * Delete record(s) by condition
   * @param condition any
   * @returns 
   */
  public delete(condition: any) {
    return this.model.destroy({ where: condition })
  }

  /**
   * Delete one record by id (primary key)
   * @param id number
   * @returns 
   */
  public deleteById(id: number) {
    return this.delete({ id: id });
  }
}
