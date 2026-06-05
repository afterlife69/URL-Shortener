import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    console.error(err);

    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Something went wrong";
        error = new ApiError(statusCode, message, error.errors, error.stack);
    }
    
    return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        success: error.success,
        message: error.message,
        errors: error.errors,
        data: error.data
    });
};

export default errorHandler;
