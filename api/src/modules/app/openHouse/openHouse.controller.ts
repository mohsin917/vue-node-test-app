import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { OpenHouseService } from './openHouse.service';
import { OpenHouseDto, UpdateOpenHouseDto } from './openHouseDto/openHouse.dto';

@Controller('openHouse')
export class OpenHouseController {
  constructor(
    private readonly _openHouseService: OpenHouseService
  ) { }

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  async createOpenHouse(@Req() req: Request, @Res() res, @Body() houseDto: OpenHouseDto) {
    try {

      return res.json(await this._openHouseService.createHouse(houseDto));
    } catch (error) {
      console.log(error);
      return res.json({ status: 'error', message: error });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async findAll(@Res() res: Response, @Body() payload) {
    try {

      return res.json(await this._openHouseService.list(payload));

    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'Something went wrong' }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  async findHouseById(@Res() res: Response, @Req() req: Request) {
    try {

      return res.json(await this._openHouseService.findHouseById(Number(req.params.id)))

    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'Something went wrong' }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-next/:currentId')
  async findNext(@Res() res: Response, @Req() req: Request) {
    try {

      return res.json(await this._openHouseService.findNext(Number(req.params.currentId)))

    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'Something went wrong' }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-prev/:currentId')
  async findPrev(@Res() res: Response, @Req() req: Request) {
    try {

      return res.json(await this._openHouseService.findPrev(Number(req.params.currentId)))

    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'Something went wrong' }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-details/:id')
  async getDetails(@Res() res: Response, @Req() req: Request) {
    try {

      return res.json(await this._openHouseService.getDetails(Number(req.params.id)))

    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'Something went wrong' }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(@Res() res: Response, @Body() payload: UpdateOpenHouseDto, @Param() param) {
    try {

      return res.json(await this._openHouseService.UpdateHouse(param.id, payload));
    } catch (error) {
      console.log(error);
      return res.json({ status: "error", message: `Something went wrong` });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(@Res() res, @Param() param) {
    try {

      return res.json(await this._openHouseService.deleteHouse(param.id));
    } catch (error) {
      console.log(error);
      return res.json({ status: 'error', message: 'Something went wrong' })
    }
  }
}
