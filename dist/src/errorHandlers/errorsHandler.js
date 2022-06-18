"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpFormater = exports.ConflictError = exports.UnexpectedError = exports.ValidationError = void 0;
class ValidationError extends Error {
}
exports.ValidationError = ValidationError;
class UnexpectedError extends Error {
}
exports.UnexpectedError = UnexpectedError;
class ConflictError extends Error {
}
exports.ConflictError = ConflictError;
const httpFormater = (err, req, res, next) => {
    if (err) {
        if (err instanceof ValidationError) {
            res.status(400).json(err.message);
            return;
        }
        if (err instanceof ConflictError) {
            res.status(409).json(err.message);
            return;
        }
        res.status(500).json(`Unexpected error. Please try again. ${err.message}`);
        return;
    }
    else {
        next();
    }
};
exports.httpFormater = httpFormater;
//# sourceMappingURL=errorsHandler.js.map