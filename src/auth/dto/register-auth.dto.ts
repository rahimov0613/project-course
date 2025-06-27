import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class RegisterAuthDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({ minLength: 8 })
    password: string;

    @IsIn(['student', 'teacher', 'admin'])
    role: 'student' | 'teacher' | 'admin';

}
