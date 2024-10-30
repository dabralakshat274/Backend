import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Entity } from "typeorm";

@Entity()
export class CreateTagDto{

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @MaxLength(256)
    name:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,{
        message: 'a slug should be of small letter and use only "-" , for example my-url '
    })
    slug:string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?:string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsJSON()
    schems?:string;

    @ApiPropertyOptional()
    @IsOptional()
    @MaxLength(1024)
    featuredImageUrl?:string;

}