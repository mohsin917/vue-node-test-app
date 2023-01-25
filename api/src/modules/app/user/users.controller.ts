import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UserService } from './user.service';
import { UserDto } from './userDto/user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly _userService: UserService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('create-user')
  async createUser(@Req() req: Request, @Res() res, @Body() userDto: UserDto) {
    try {

      return res.json(await this._userService.createUser(userDto));
    } catch (error) {
      return res.json({ status: 'error', message: "Something went wrong" });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async findAll(@Res() res: Response, @Body() payload) {
    try {

      return res.json(await this._userService.list(payload));

    } catch (error) {
      return { status: 'error', message: 'Something went wrong' }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  async findUserById(@Res() res: Response, @Req() req: Request) {
    try {

      return res.json(await this._userService.findUserById(Number(req.params.id)))

    } catch (error) {
      return { status: 'error', message: 'Something went wrong' }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(@Res() res: Response, @Body() payload: UserDto, @Param() param) {
    try {

      return res.json(await this._userService.UpdateUser(param.id, payload));
    } catch (error) {

      return res.json({ status: "error", message: `Something went wrong` });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(@Res() res, @Param() param) {
    try {

      return res.json(await this._userService.deleteUser(param.id));
    } catch (error) {
      return res.json({ status: 'error', message: 'Something went wrong' })
    }
  }
}
