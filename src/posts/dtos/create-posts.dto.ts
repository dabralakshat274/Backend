import { IsArray, IsDate, IsEnum, IsInt, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MATCHES, MaxLength, MinLength, Validate, ValidateNested,  } from "class-validator";
import { postStatus } from "../enums/postsStatus.enum";
import { postType } from "../enums/postType.enum";
import { CreatePostMetaOptionsDto } from "../../meta-options/dtos/create-post-metaoptions.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto{
    @ApiProperty(
        {example:"This is a title",description:"this is the description "}
    )
    @IsString()
    @MinLength(4)
    @MaxLength(512)
    @IsNotEmpty()
    title:string;


    @ApiProperty(
        {enum:postType,description:"Possible values- 'post','page','story','series' "}
    )
    @IsEnum(postType)
    @IsNotEmpty()
    postType:postType;

    @ApiProperty({
        description:"For example- my-url", 
        example:'my-blog-post'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,{
        message: 'a slug should be of small letter and use only "-" , for example my-url '
    })
    slug:string;

    @ApiProperty({
        enum:postStatus,
        description:"Possible values- 'draft','scheduled','review','published' "
    })
    @IsEnum(postStatus)
    @IsNotEmpty()
    status:postStatus;

    @ApiPropertyOptional({
        description:"This is the content of the post",
        example:"This post content"
    })
    @IsString()
    @IsOptional()
    content?: string;

    @ApiPropertyOptional({
        description:"Serialize yout JSON object else avalidation error will be thrown",
        example:'{\r\n    \"@context\": \"https:\/\/schema.org\",\r\n    \"@type\": \"Person\"\r\n  }'
    })
    @IsOptional()
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional({
        description:"Featured image for your blog post",
        example:"https://unsplash.com/photos/people-sitting-at-the-table-2pPw5Glro5I"
    })
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageURL?: string;

    @ApiPropertyOptional({
        description:"The date on which the blog post is published",
        example:"2024-03-16T07:46:32+0000"
    })
    @IsDate()
    @IsOptional()
    publishOn?: Date;

    @ApiPropertyOptional({
        //description:"Array of tags passed as string values",
        description:"Array of ID's of tag",

      //  example:["nestjs","typescript"]
      example:[1,2],

    })

    @IsOptional()
    @IsArray()
  //  @IsString({each:true})
  //  @MinLength(3,{each:true})
  @IsInt({each:true})  
  tags?:number[];                       //id of tags

    @ApiPropertyOptional({
        //type:'array',
        type:'object',
        required:false,
        items:{
            type:'object',
            properties:{
                metavalue:{
                         type:'json',
                         description:"The meta value is a json string",
                         example:'{"SidebarEnableld":true"}'
                     },



                // key:{
                //     type:'string',
                //     description:"the key can be any string indentifier for your meta options",
                //     example:"testkey"
                // },
                // value:{
                //     type:'any',
                //     description:"Any value want to save to the key",
                //     example:true
                // }
            }
        },
        
    })
    @IsOptional()
    //@IsArray()
    @ValidateNested({each:true})
    @Type(()=>CreatePostMetaOptionsDto)
    metaoptions?:CreatePostMetaOptionsDto | null;
    //metaoptions?:CreatePostMetaOptionsDto[];

/*
    @IsInt()
    @IsNotEmpty()
    @ApiProperty({
        type:'integer',
        required:true,
        example:1,
    })
    authorId:number;*/

}