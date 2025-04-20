"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tour_controller_1 = require("../controllers/tour.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const tourRouter = (0, express_1.Router)();
tourRouter.get("/", auth_middleware_1.default, tour_controller_1.getAllTours);
tourRouter.post("/create-tour", auth_middleware_1.default, tour_controller_1.createTour);
tourRouter.put("/join-tour/:id", auth_middleware_1.default, tour_controller_1.joinTour);
tourRouter.put("/unjoin-tour/:id", auth_middleware_1.default, tour_controller_1.unJoinATour);
tourRouter.delete("/delete-tour/:id", auth_middleware_1.default, tour_controller_1.deleteAtour);
exports.default = tourRouter;
