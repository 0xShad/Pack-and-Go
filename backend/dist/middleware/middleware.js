"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let error = Object.assign({}, err);
        error.message = err.message;
        console.log(err);
        if (err.name === 'CastError') {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }
        if (err.code === 11000) {
            const message = 'Duplicate value field entered';
            error = new Error(message);
            error.statusCode = 404;
        }
        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = errorMiddleware;
