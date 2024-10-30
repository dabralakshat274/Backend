import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto{

    @IsOptional()
    @IsPositive()
   // @Type(()=> Number)       // not needed as transformOptions is applied in main.ts
    limit?:number=10;             //default value set as 10

    @IsOptional()
    @IsPositive()
    page?:number=1;               //default value set as 10
}