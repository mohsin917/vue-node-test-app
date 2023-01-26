import { IsNotEmpty, MinLength, IsEmail, IsEnum, isNumber } from 'class-validator';

export class OpenHouseDetailDto {

    @IsNotEmpty()
    readonly houseId: number;

    @IsNotEmpty()
    readonly userId: number;
}

export class UpdateOpenHouseDetailDto {

    @IsNotEmpty()
    readonly houseId: number;

    @IsNotEmpty()
    readonly userId: number;
}
