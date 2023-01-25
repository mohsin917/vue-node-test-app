import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { request } from 'http';
import { Observable } from 'rxjs';
import { UserService } from 'src/modules/app/user/user.service';


@Injectable()
export class UserGuards implements CanActivate {
	constructor(private readonly _userService: UserService) { }

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		return request.method === 'PUT' ? this.checkUser(request) : this.validateRequest(request);
	}

	async validateRequest(request) {
		if (!request.body.email) throw new ForbiddenException('Please enter a valid email');
		const userExist = await this._userService.findByEmail(request.body.email);
		if (userExist) {
			throw new ForbiddenException('This email already exist');
		}
		return true;
	}

	async checkUser(request) {
		const userExist = await this._userService.findUserById(Number(request.params.id));
		if (userExist) {
			return true;
		}
		throw new ForbiddenException('This email already exist');
	}
}

