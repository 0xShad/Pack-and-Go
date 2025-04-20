"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.post('/sign-in', auth_controller_1.signIn);
authRouter.post('/sign-up', auth_controller_1.signUp);
exports.default = authRouter;
