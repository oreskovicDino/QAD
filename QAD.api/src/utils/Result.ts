
export class Result<T> {
    public data: T | null;
    public success: boolean;
    public errors: string[] | null;
    public info: string | null;
    public responseCode: number;

    private constructor(data: T | null, success: boolean, errors: string[] | null, info: string | null, responseCode: number = 200) {
        this.data = data;
        this.success = success;
        this.errors = errors;
        this.info = info;
        this.responseCode = responseCode;
    }

    public static new<T>(data: T, responseCode?: number): Result<T> {
        return new Result<T>(data, true, null, null, responseCode);
    }

    public static newError<T>(responseCode: number, ...errors: string[]): Result<T> {
        return new Result<T>(null, false, errors, null, responseCode);
    }

    public static newErrorWithInfo<T>(info: string, responseCode: number, ...errors: string[]): Result<T> {
        return new Result<T>(null, false, errors, info, responseCode);
    }
}
