"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeblock = void 0;
const mongoose_1 = require("mongoose");
exports.Timeblock = (0, mongoose_1.model)('Timeblock', new mongoose_1.Schema({
    user: {
        type: String,
        required: true,
    },
    isTracking: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    endedAt: Date,
    description: String,
    duration: String,
}));
