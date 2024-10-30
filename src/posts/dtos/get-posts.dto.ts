import { IsDate, IsOptional } from "class-validator";
import { IntersectionType } from "@nestjs/swagger";         // for combining two Dto's
import { PaginationQueryDto } from "src/dtos/pagination-query.dto";

class GetPostBaseDto{

    @IsOptional()
    @IsDate()
    startDate?: Date;

    @IsOptional()
    @IsDate()
    endDate?:Date;
}

/*It is in common  */


export class GetPostDto extends IntersectionType(GetPostBaseDto,PaginationQueryDto){}   // combines both Dto