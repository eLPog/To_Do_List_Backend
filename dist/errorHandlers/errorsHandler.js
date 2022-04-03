"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpFormater = exports.UnexpectedError = exports.ValidationError = void 0;
class ValidationError extends Error {
}
exports.ValidationError = ValidationError;
class UnexpectedError extends Error {
}
exports.UnexpectedError = UnexpectedError;
const httpFormater = (err, req, res, next) => {
    if (err) {
        if (err instanceof ValidationError) {
            res.status(400).json(err.message);
        }
        res.status(500).json(`Unexpected error. Please try again. ${err.message}`);
    }
    else {
        next();
    }
};
exports.httpFormater = httpFormater;
//# sourceMappingURL=errorsHandler.js.map