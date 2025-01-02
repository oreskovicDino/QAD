"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor(data, success, errors, info, responseCode = 200) {
        this.data = data;
        this.success = success;
        this.errors = errors;
        this.info = info;
        this.responseCode = responseCode;
    }
    static new(data, responseCode) {
        return new Result(data, true, null, null, responseCode);
    }
    static newError(responseCode, ...errors) {
        return new Result(null, false, errors, null, responseCode);
    }
    static newErrorWithInfo(info, responseCode, ...errors) {
        return new Result(null, false, errors, info, responseCode);
    }
}
exports.Result = Result;
