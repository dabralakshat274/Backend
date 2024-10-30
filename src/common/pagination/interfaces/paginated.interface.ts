export interface Paginated<T>{        //converting into generic using <T>   , in T we can add post or user etc. so data will be of that type array.
    data:T[];                       //array of entities eg: if want to paginate user entity then the data will be an array of users.
    meta:{
        itemsPerPage:number;
        totalItems:number;
        currentPage:number;
        totalPages:number;
    };
    links:{
        first:string;               //first page
        last:string;               //second Page
        current:string;           //current Page
        next:string;             //next Page  
        previous:string;
    }
}