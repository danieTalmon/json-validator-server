class GeneralJVError extends Error {
    constructor(errorMsg, statusCode, errorCode) {        
        super(errorMsg);
        this.name = "GeneralJVError";
        this.statusCode = statusCode;
        this.errorCode = errorCode;
    }
}

module.exports = GeneralJVError;