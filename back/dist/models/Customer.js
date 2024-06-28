"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CustomerSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Veuillez entrer une adresse e-mail valide']
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    }
});
exports.default = mongoose_1.default.model('Customer', CustomerSchema);
