import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { PropertyService } from './property.service';
import { PropertyDto } from './propertyDto/property.dto';


@Controller('property')
export class PropertyController {
  constructor(
    private readonly _propertyService: PropertyService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Req() req: Request, @Res() res, @Body() propertyDto: PropertyDto) {
    try {

      return res.json(await this._propertyService.createProperty(propertyDto));
    } catch (error) {
      return res.json({ status: 'error', message: "Something went wrong" });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async findAll(@Res() res: Response, @Body() payload) {
    try {

      return res.json(await this._propertyService.list(payload));

    } catch (error) {
      return { status: 'error', message: 'Something went wrong' }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  async findProperty(@Res() res: Response, @Req() req: Request) {
    try {

      return res.json(await this._propertyService.findPropertyById(Number(req.params.id)))

    } catch (error) {
      return { status: 'error', message: 'Something went wrong' }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(@Res() res: Response, @Body() payload: PropertyDto, @Param() param) {
    try {

      return res.json(await this._propertyService.UpdateProperty(Number(param.id), payload));
    } catch (error) {

      return res.json({ status: "error", message: `Something went wrong` });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(@Res() res, @Param() param) {
    try {

      return res.json(await this._propertyService.deleteProperty(param.id));
    } catch (error) {
      return res.json({ status: 'error', message: 'Something went wrong' })
    }
  }
}
