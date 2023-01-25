import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { OpenHouseDetailService } from './openHouseDetail.service';
import { OpenHouseDetailDto, UpdateOpenHouseDetailDto } from './openHouseDetailDto/openHouseDetail.dto';

@Controller('openHouseDetail')
export class OpenHouseDetailController {
  constructor(
    private readonly _openHouseDetailService: OpenHouseDetailService
  ) { }

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  async createOpenHouse(@Req() req: Request, @Res() res, @Body() houseDto: OpenHouseDetailDto) {
    try {

      return res.json(await this._openHouseDetailService.createDetailHouse(houseDto));
    } catch (error) {
      console.log(error);
      return res.json({ status: 'error', message: 'something went wrong' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async findAll(@Res() res: Response, @Body() payload) {
    try {

      return res.json(await this._openHouseDetailService.list(payload));

    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'Something went wrong' }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  async findHouseById(@Res() res: Response, @Req() req: Request) {
    try {

      return res.json(await this._openHouseDetailService.findHouseById(Number(req.params.id)))

    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'Something went wrong' }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(@Res() res: Response, @Body() payload: UpdateOpenHouseDetailDto, @Param() param) {
    try {

      return res.json(await this._openHouseDetailService.UpdateHouse(param.id, payload));
    } catch (error) {
      console.log(error);
      return res.json({ status: "error", message: `Something went wrong` });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(@Res() res, @Param() param) {
    try {

      return res.json(await this._openHouseDetailService.deleteHouse(param.id));
    } catch (error) {
      console.log(error);
      return res.json({ status: 'error', message: 'Something went wrong' })
    }
  }
}
