import { Course } from "src/course/entities/course.entity";
import { Lesson } from "src/lessons/entities/lesson.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Model {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @ManyToOne(()=>Course,(course)=> course.model)
    course:Course;

    @OneToMany(()=>Lesson,(lesson)=>lesson.model)
    lessons:Lesson[];
}
