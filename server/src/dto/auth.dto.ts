import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name!: string

    @IsString()
    @IsEmail()
    email!: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password!: string
}

export class LoginDto {
    @IsString()
    @IsEmail()
    email!: string

    @IsString()
    @IsNotEmpty()
    password!: string
}
