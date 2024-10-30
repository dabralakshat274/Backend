import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { postType } from "./enums/postType.enum";
import { postStatus } from "./enums/postsStatus.enum";
import { CreatePostMetaOptionsDto } from "../meta-options/dtos/create-post-metaoptions.dto";
import { timestamp } from "rxjs";
import { MetaOption } from "src/meta-options/meta-options.entity";
import { User } from "src/users/entities/user.entity";
import { tag } from "src/tags/tag.entity";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:"varchar" ,
        length:512,
        nullable:false,
    })
    title:string;

    @Column({
        type:'enum' ,
        enum:postType,
        nullable:false,
        default:postType.POSt,
    })
    postType:postType;

    @Column({
        type:"varchar" ,
        length:256,
        nullable:false,
        unique:true,
    })
    slug:string;

    @Column({
        type:"enum" ,
        enum:postStatus,
        nullable:false,
        default:postStatus.DRAFT,
    })
    status:postStatus;

    @Column({
        type:"text" ,
        nullable:true,
    })
    content?: string;

    @Column({
        type:"text" ,
        nullable:true,
    })
    schema?: string;

    @Column({
        type:"varchar" ,
        length:1024,
        nullable:true,
    })
    featuredImageURL?: string;

    @Column({
        type:"timestamp" ,  //for postgres only
        nullable:true,
    })
    publishOn?:Date;

    // @Column({
    //     type:'varchar' ,  
    //     nullable:true,
    // })
    @ManyToMany(()=>tag,(tag)=>tag.posts ,{cascade:true,eager:true,})
    @JoinTable()
    tags?:tag[];



    // @Column({
    //     type:"varchar" ,
    //     nullable:false,
    // })


    //@OneToOne(()=>MetaOption,{            //for uni-directional

    @OneToOne(()=>MetaOption,(metaOptions)=>metaOptions.post,{               //for bi-directional

        cascade:true, 
        eager:true,      //with this TypeOrm will fetch ffor post and metaoptions
    })
    //@JoinColumn()
    metaoptions?:MetaOption;


    //    metaoptions?:CreatePostmetaOptionsDto[]

@ManyToOne(()=> User,(user)=>user.posts,{
    eager:true,
})
author:User;
}