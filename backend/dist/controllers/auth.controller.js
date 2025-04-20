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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserRequest_zod_1 = require("../validators/UserRequest.zod");
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const SignIn_zod_1 = require("../validators/SignIn.zod");
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { username, firstName, lastName, email, password } = UserRequest_zod_1.UserRequestSchema.parse(req.body);
        const userIsExisting = yield user_model_1.User.findOne({ email });
        const usernameIsExisting = yield user_model_1.User.findOne({ username });
        if (usernameIsExisting) {
            const error = new Error("Username is already existing");
            error.statusCode = 409;
            throw error;
        }
        if (userIsExisting) {
            const error = new Error("User is already exisiting");
            error.statusCode = 409;
            throw error;
        }
        //Hash the password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        //Push to db
        const newUser = yield user_model_1.User.create([
            { username, firstName, lastName, email, password: hashedPassword },
        ]);
        //Create token for that user
        const token = jsonwebtoken_1.default.sign({ userId: newUser[0]._id }, config_1.JWT_SECRET, { expiresIn: "1d" } // resolves to '1d'
        );
        yield session.commitTransaction();
        res.status(202).json({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUser[0],
            },
        });
    }
    catch (error) {
        yield session.endSession();
        session.abortTransaction();
        next(error);
    }
});
exports.signUp = signUp;
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // fetch email and password
    // check if the user exist
    // compare the password to the hashedpassword
    // validate ? logged ins : error
    try {
        const { email, password } = SignIn_zod_1.SignInZodSchema.parse(req.body);
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const userHashedPassword = user.password;
        const isPasswordValid = yield bcryptjs_1.default.compare(password, userHashedPassword);
        if (!isPasswordValid) {
            const error = new Error('Password is incorrect');
            error.statusCode = 401;
            throw error;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.JWT_SECRET, { expiresIn: "1d" });
        res.status(202).json({
            success: true,
            message: 'logged in successful',
            data: {
                token,
                user
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signIn = signIn;
