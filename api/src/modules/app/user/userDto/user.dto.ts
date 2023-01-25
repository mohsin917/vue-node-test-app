import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

enum GENDER {
    MALE = 'male',
    FEMALE = 'female'
}

export class UserDto {

    @IsNotEmpty()
    readonly name: string;

}
