"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mapSiteComponentStyleSchema = new mongoose_1.Schema({
    containerBgColor: { type: String, required: true, trim: true },
    containerPadding: { type: String, required: true, trim: true },
    containerMinHeight: { type: String, required: true, trim: true },
    boxMarginX: { type: String, required: true, trim: true },
    boxMarginY: { type: String, required: true, trim: true },
    boxMarginBottom: { type: String, required: true, trim: true },
    titleColor: { type: String, required: true, trim: true },
    titleFontSize: { type: [String], required: true, trim: true },
    titleMarginBottom: { type: String, required: true, trim: true },
    textColor: { type: String, required: true, trim: true },
    textFontSize: { type: [String], required: true, trim: true },
});
const MapSiteComponentStyle = (0, mongoose_1.model)('MapSiteComponentStyle', mapSiteComponentStyleSchema);
exports.default = MapSiteComponentStyle;
