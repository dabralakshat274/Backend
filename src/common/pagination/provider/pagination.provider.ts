import { Injectable,Inject } from '@nestjs/common';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { ObjectLiteral, Repository,  } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
    constructor(
        /**
         * Injecting Request
         */
        @Inject(REQUEST)
        private readonly request: Request,
    ){}

    public async paginateQuery<T extends ObjectLiteral>   // <T extends ObjectLiteral> it means T can be an object of user or post depending upon what respository passing here
    (paginationQuery: PaginationQueryDto, respository: Repository<T>):Promise<Paginated<T>>
    {

        let results = await respository.find({
           
            skip:(paginationQuery.page-1)* paginationQuery.limit,        // skips the element eg 2 page skip first 10 and show 11-20
            take:paginationQuery.limit, });

            /**
             * Create the request URL
             */

            const baseURL=this.request.protocol + '://' + this.request.headers.host + '/';
            console.log(baseURL);
            const newUrl=new URL(this.request.url,baseURL);
            console.log(newUrl);

            /**
             * Calculating page number
             */
            const totalItems=await respository.count();
            const totalPages=Math.ceil(totalItems/paginationQuery.limit);
            const nextPage=paginationQuery.page===totalPages?paginationQuery.page:paginationQuery.page + 1;
            const previousPage=paginationQuery.page===totalPages?paginationQuery.page:paginationQuery.page - 1;


            const finalResponse: Paginated<T>={
                data:results,
                meta:{
                    itemsPerPage: paginationQuery.limit,
                    totalItems:totalItems,
                    currentPage:paginationQuery.page,
                    totalPages:totalPages,
                },
                links:{
                    first:`${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`,
                    last:`${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
                    current:`${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
                    next:`${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
                    previous:`${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${previousPage}`,



                }
            }

           // return results;
           return finalResponse;

    }

}

