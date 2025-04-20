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
exports.deleteAtour = exports.unJoinATour = exports.joinTour = exports.createTour = exports.getAllTours = void 0;
const tour_model_1 = __importDefault(require("../models/tour.model"));
const user_model_1 = require("../models/user.model");
const getAllTours = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const tours = yield tour_model_1.default.find({ $or: [{ Organizer: userId }, { Participants: userId }] });
        if (!tours) {
            res.status(404).json({ message: "No tours found" });
            return;
        }
        res.json(tours);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTours = getAllTours;
const createTour = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const organizer = yield user_model_1.User.findById(userId);
        if (!userId) {
            const error = new Error("UserId not found");
            error.statusCode = 404;
            throw error;
        }
        if (!organizer) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        const { TourTitle, TourDescription, TourDate, TourLocation, TourPax, TourPrice, } = req.body;
        const newTour = new tour_model_1.default({
            TourTitle,
            TourDescription,
            TourDate,
            TourLocation,
            TourPax,
            TourPrice,
            Organizer: organizer,
        });
        yield newTour.save();
        res.status(201).json({
            success: true,
            message: "Tour created",
            data: {
                TourTitle,
                TourDescription,
                TourDate,
                TourLocation,
                TourPax,
                TourPrice,
                Organizer: organizer,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createTour = createTour;
const joinTour = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const user = yield user_model_1.User.findById(userId);
        const TourId = req.params.id;
        const tour = yield tour_model_1.default.findById(TourId);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        if (!userId) {
            const error = new Error("UserId is not provided");
            error.statusCode = 404;
            throw error;
        }
        if (!tour) {
            const error = new Error("Tour not found");
            error.statusCode = 404;
            throw error;
        }
        //check if the user is already joined to the tour
        if (tour.Participants.includes(user._id)) {
            const error = new Error("Already joined");
            error.statusCode = 409;
            throw error;
        }
        //check if the user is the creator of the tour
        if (tour.Organizer.toString() === userId.toString()) {
            const error = new Error("You cannot join your own tour.");
            error.statusCode = 409;
            throw error;
        }
        tour.Participants.push(user._id);
        yield tour.save();
        res.status(200).json({
            success: true,
            message: "Successfully joined the tour",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.joinTour = joinTour;
const unJoinATour = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const TourId = req.params.id;
        const tour = yield tour_model_1.default.findById(TourId);
        const user = yield user_model_1.User.findById(userId);
        if (!tour) {
            const error = new Error("Tour not found");
            error.statusCode = 404;
            throw error;
        }
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        //check if the user is actually joined to that specific tour
        if (!tour.Participants.includes(user._id)) {
            res.status(404).json({
                message: "User does not belong to this tour",
            });
            return;
        }
        tour.Participants.pull(user._id);
        yield tour.save();
        res.status(200).json({
            success: true,
            message: `Successfully unjoined the tour of ${tour.TourTitle}`,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.unJoinATour = unJoinATour;
const deleteAtour = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TourId = req.params.id;
        const userId = req.userId;
        const deleteTour = yield tour_model_1.default.findOneAndDelete({ _id: TourId, Organizer: userId });
        if (!deleteTour) {
            const error = new Error('Tour not found or you are not the organzier of the tour.');
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: 'Tour successfully deleted.',
            tour: deleteTour
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAtour = deleteAtour;
