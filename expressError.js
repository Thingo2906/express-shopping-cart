class ExpressError extends Error{
    constructor(message, status){
        supper();
        this.message = message;
        this.status = status;
        console.error(this.stack);
    }
}
module.exports = ExpressError;