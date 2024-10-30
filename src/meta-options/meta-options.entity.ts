import { Post } from "src/posts/post.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MetaOption{
    @PrimaryGeneratedColumn()
id:number;

@Column({
    type:'json',
    nullable:false
})
metaValue:string;

@CreateDateColumn()
createdate:Date;

@UpdateDateColumn()
updateDate:Date;

@OneToOne(()=>Post,(post)=>post.metaoptions,{
    onDelete:'CASCADE',
})
@JoinColumn()
post:Post
}