import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../app/admin/admin.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly _adminService: AdminService,
		private readonly _jwtService: JwtService,
	) { }

	public async login(payload) {
		return this.validateUser(payload.email, payload.password);
	}

	async validateUser(email: string, pass: string) {
		try {
			const admin = await this._adminService.findOne({ email: email });
			if (!admin) {
				return { status: 'error', message: "admin not found! please try again" };
			}

			const match = await this.comparePassword(pass, admin.password);
			if (!match) {
				return { status: 'error', message: "Invalid credentials" };
			}

			const token = await this.generateToken({ id: admin.id, email: admin.email });

			const { password, ...result } = admin['dataValues'];

			return { status: 'success', data: { token: token, admin: result } };
		} catch (error) {
			console.log(error);
			return { status: 'error', data: error?.response?.data || error?.stack };
		}
	}

	private async comparePassword(enteredPassword, dbPassword) {
		const match = await bcrypt.compare(enteredPassword, dbPassword);
		return match;
	}

	private async generateToken(admin) {
		const token = await this._jwtService.signAsync(admin, { secret: process.env.SECRET_KEY });
		return token;
	}

	private async hashPassword(password) {
		const hash = await bcrypt.hash(password, 10);
		return hash;
	}
}