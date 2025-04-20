"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_URI = exports.JWT_SECRET = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env.development' });
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}
if (!process.env.DB_URI) {
    throw new Error('DB_URI is not defined');
}
if (!process.env.PORT) {
    throw new Error('PORT is not defined');
}
exports.PORT = process.env.PORT;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.DB_URI = process.env.DB_URI;
