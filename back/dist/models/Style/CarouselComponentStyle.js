"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carouselComponentStyleSchema = new mongoose_1.Schema({
    containerBgColor: { type: String, required: true, trim: true },
    textColor: { type: String, required: true, trim: true },
    titleFontSize: { type: String, required: true, trim: true },
    titleFontColor: { type: String, required: true, trim: true },
    carouselBgColor: { type: String, required: true, trim: true },
    arrowColor: { type: String, required: true, trim: true },
    imageBorderColor: { type: String, required: true, trim: true },
    imageBorderWidth: { type: String, required: true, trim: true },
    imageMaxHeight: { type: String, required: true, trim: true },
});
const CarouselComponentStyle = (0, mongoose_1.model)('CarouselComponentStyle', carouselComponentStyleSchema);
exports.default = CarouselComponentStyle;
