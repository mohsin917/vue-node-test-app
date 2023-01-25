import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { AdminService } from './admin.service';
import { UpdateAdminDto, AdminDto } from './adminDto/admin.dto';
import * as bcrypt from 'bcrypt';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly _adminService: AdminService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createAdmin(@Req() req: Request, @Res() res, @Body() adminDto: AdminDto) {
    try {

      return res.json(await this._adminService.createAdmin(adminDto));
    } catch (error) {
      console.log(error);
      return res.json({ status: 'error', message: "Something went wrong" });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async findAll(@Res() res: Response, @Body() payload) {
    try {

      return res.json(await this._adminService.list(payload));

    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'Something went wrong' }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  async findAdminById(@Res() res: Response, @Req() req: Request) {
    try {

      return res.json(await this._adminService.findAdminById(Number(req.params.id)))

    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'Something went wrong' }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(@Res() res: Response, @Body() payload: UpdateAdminDto, @Param() param) {
    try {

      return res.json(await this._adminService.UpdateAdmin(param.id, payload));
    } catch (error) {
      console.log(error);
      return res.json({ status: "error", message: `Something went wrong` });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(@Res() res, @Param() param) {
    try {

      return res.json(await this._adminService.deleteAdmin(param.id));
    } catch (error) {
      console.log(error);
      return res.json({ status: 'error', message: 'Something went wrong' })
    }
  }
}
