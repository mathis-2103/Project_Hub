"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/title.js
const mongoose_1 = __importDefault(require("mongoose"));
const titleSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    products: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Product'
        }]
});
const Title = mongoose_1.default.model('Title', titleSchema);
exports.default = Title;
