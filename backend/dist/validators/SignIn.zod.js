"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInZodSchema = void 0;
const zod_1 = require("zod");
exports.SignInZodSchema = zod_1.z.object({
    email: zod_1.z.string().toLowerCase().email(),
    password: zod_1.z.string().min(6)
});
