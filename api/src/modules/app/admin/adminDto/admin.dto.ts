import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class AdminDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}

export class UpdateAdminDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}
