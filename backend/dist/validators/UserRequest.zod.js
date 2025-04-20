"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRequestSchema = void 0;
const zod_1 = require("zod");
exports.UserRequestSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    firstName: zod_1.z.string().min(2),
    lastName: zod_1.z.string().min(2),
    email: zod_1.z.string().email().toLowerCase(),
    password: zod_1.z.string().min(6)
});
