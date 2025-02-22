export class Response<T> {
    constructor(
        readonly success: boolean,
        readonly message: string,
        readonly data: T
    ) { }
}