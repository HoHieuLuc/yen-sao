export interface PaginateVars {
    page: number;
    limit: number;
}

export interface PageInfo extends PaginateVars {
    totalPages: number;
}