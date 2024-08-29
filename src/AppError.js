export default class AppError extends Error {
    statuscode

    constructor(message, statuscode = 400) {
        super(message)
        this.statuscode = statuscode
    }
}