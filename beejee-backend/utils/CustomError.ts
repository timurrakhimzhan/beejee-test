export default class CustomErrorObj extends Error {
    messageObj: object;

    constructor(data: object) {
        super("Custom Error")
        this.messageObj = data;
    }
}