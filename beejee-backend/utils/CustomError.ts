export default class CustomError {
    message?: string;
    payload?: object;

    constructor(data?: string | object) {
        if(typeof data === 'string') {
            this.message = data;
        } else {
            this.payload = data;
        }
    }
}