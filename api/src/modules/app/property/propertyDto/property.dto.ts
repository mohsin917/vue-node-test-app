import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class PropertyDto {

    readonly id: number;

    @IsNotEmpty()
    readonly address: string;

    readonly description: string;
}

