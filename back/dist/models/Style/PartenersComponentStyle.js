"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PartnersStyleSchema = new mongoose_1.Schema({
    containerBgColor: { type: String, required: true, trim: true },
    containerPaddingY: { type: Number, required: true },
    titleFontSize: { type: String, required: true, trim: true },
    titleColor: { type: String, required: true, trim: true },
    gridSpacing: { type: Number, required: true },
    imageMaxHeight: { type: String, required: true, trim: true },
    imageBoxSize: { type: String, required: true, trim: true },
    imageBorderRadius: { type: String, required: true, trim: true },
    hoverScale: { type: String, required: true, trim: true },
});
const PartnersStyle = (0, mongoose_1.model)('PartnersStyle', PartnersStyleSchema);
exports.default = PartnersStyle;
