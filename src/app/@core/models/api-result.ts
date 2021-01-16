export interface ApiResult<T> {
    data: T;
    status: string;
    message: string;
}
