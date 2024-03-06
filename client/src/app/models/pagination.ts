export interface MetData{
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
}

export class PaginatedResponse<T>{
    items : T;
    metaData: MetData;

    constructor(items: T, metaData: MetData){
        this.items = items;
        this.metaData = metaData;
    }
}