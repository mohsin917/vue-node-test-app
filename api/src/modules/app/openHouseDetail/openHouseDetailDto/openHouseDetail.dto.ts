import { IsNotEmpty, MinLength, IsEmail, IsEnum, isNumber } from 'class-validator';

export class OpenHouseDetailDto {

    @IsNotEmpty()
    readonly propertyId: number;

    @IsNotEmpty()
    readonly tenantAmount: number;

    @IsNotEmpty()
    readonly houseId: number;

    @IsNotEmpty()
    readonly userId: number;
}

export class UpdateOpenHouseDetailDto {

    @IsNotEmpty()
    readonly propertyId: number;

    @IsNotEmpty()
    readonly tenantAmount: number;

    @IsNotEmpty()
    readonly houseId: number;

    @IsNotEmpty()
    readonly userId: number;
}
