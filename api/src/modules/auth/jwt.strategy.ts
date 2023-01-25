import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../app/user/user.service';
import { AdminService } from '../app/admin/admin.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly _adminService: AdminService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'ROOFUS_secrect_key_2023',
		});
	}

	async validate(payload: any) {
		const user = await this._adminService.findOneById(payload.id);
		if (!user) {
			throw new UnauthorizedException('You are not authorized to perform the operation');
		}

		return payload;
	}
}