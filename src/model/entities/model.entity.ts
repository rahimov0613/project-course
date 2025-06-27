import { Course } from "src/course/entities/course.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Model {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @ManyToOne(()=>Course,(course)=> course.modules)
    course:Course;

    // @OneToMany(()=>Lesson,(lesson)=>lesson.module)
    // lessons:Lesson[];
}
