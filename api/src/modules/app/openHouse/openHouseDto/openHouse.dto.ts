import { IsNotEmpty, MinLength, IsEmail, IsEnum, isNumber } from 'class-validator';

export class OpenHouseDto {

    @IsNotEmpty()
    readonly propertyId: number;

    @IsNotEmpty()
    readonly visitorAmount: number;

    @IsNotEmpty()
    readonly startDate: string;
}

export class UpdateOpenHouseDto {

    @IsNotEmpty()
    readonly property_id: string;

    @IsNotEmpty()
    @IsEmail()
    readonly visitor_amount: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly start_date: string;
}
