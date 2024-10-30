import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreatePostDto } from "./create-posts.dto";

export class PatchPostDto extends PartialType(CreatePostDto){
@ApiProperty({description:'The Id of the post that needs to be updated'})
@IsInt()
@IsNotEmpty()
id:number;
}