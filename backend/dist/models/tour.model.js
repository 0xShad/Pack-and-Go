"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TourSchema = new mongoose_1.default.Schema({
    TourTitle: {
        type: String,
        required: true,
        trim: true,
    },
    TourDescription: {
        type: String,
        required: true,
    },
    TourPax: {
        type: Number,
        required: true,
        min: 1,
    },
    TourLocation: {
        type: String,
        required: true,
    },
    TourDate: {
        type: Date,
        required: true,
    },
    TourPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    Organizer: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Participants: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    isFull: {
        type: Boolean,
        default: false,
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});
const Tour = mongoose_1.default.model("Tour", TourSchema);
exports.default = Tour;
