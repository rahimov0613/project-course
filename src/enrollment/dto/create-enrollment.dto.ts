import { IsNumber } from "class-validator";
import { Course } from "src/course/entities/course.entity";
import { User } from "src/users/entities/user.entity";

export class CreateEnrollmentDto {
    user: User;

    course: Course;
}
