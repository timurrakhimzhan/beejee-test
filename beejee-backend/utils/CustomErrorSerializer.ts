import CustomErrorObj from "./CustomError";

export default class CustomErrorSerializer {
    error?: object | Error;

    constructor(data: object | Error | CustomErrorObj) {
        if(data instanceof CustomErrorObj) {
            this.error = data.messageObj;
            return;
        }
        this.error = data;
    }
}