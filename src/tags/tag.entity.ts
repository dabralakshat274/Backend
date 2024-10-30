import { Post } from "src/posts/post.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class tag{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:"varchar",
        length:26,
        nullable:false,
        unique:true,
    })
    name:string;
    
    @Column({
        type:"varchar",
        length:256,
        nullable:false,
        unique:true,
    })
    slug:string;

    @Column({
        type:"text",
        nullable:true,
    })
    description?:string;

    @Column({
        type:"text",
        nullable:true,
    })
    schems?:string;

    @Column({
        type:"varchar",
        length:1024,
        nullable:true,
    })
    featuredImageUrl?:string;

    @ManyToMany(()=>Post,(post)=>post.tags,{onDelete:"CASCADE"})
    posts:Post

    @CreateDateColumn()
    createDate:Date;

    @UpdateDateColumn()
    updateDate:Date;

    @DeleteDateColumn()  //soft deletion
    deletedAt:Date;
}