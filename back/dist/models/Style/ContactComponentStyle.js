"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contactComponentStyleSchema = new mongoose_1.Schema({
    containerBgColor: { type: String, required: true, trim: true },
    formBgColor: { type: String, required: true, trim: true },
    inputBorderColor: { type: String, required: true, trim: true },
    inputTextColor: { type: String, required: true, trim: true },
    buttonBgColor: { type: String, required: true, trim: true },
    buttonHoverBgColor: { type: String, required: true, trim: true },
    buttonTextColor: { type: String, required: true, trim: true },
    titleFontSize: { type: String, required: true, trim: true },
    titleFontColor: { type: String, required: true, trim: true },
});
const ContactComponentStyle = (0, mongoose_1.model)('ContactComponentStyle', contactComponentStyleSchema);
exports.default = ContactComponentStyle;
