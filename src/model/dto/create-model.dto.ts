import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateModelDto {
    @IsString()
    @IsNotEmpty()
    titile:string;

    @IsNumber()
    courseId:number;
}

