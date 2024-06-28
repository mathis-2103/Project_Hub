"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const socialNetworkStyleSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    containerBgColor: { type: String, required: true, trim: true },
    titleFontSize: {
        base: { type: String, required: true, trim: true },
        md: { type: String, required: true, trim: true }
    },
    titleColor: { type: String, required: true, trim: true },
    iconSize: {
        base: { type: String, required: true, trim: true },
        md: { type: String, required: true, trim: true }
    },
    iconMarginBottom: { type: String, required: true, trim: true },
    iconMarginRight: { type: String, required: true, trim: true },
    iconTransition: { type: String, required: true, trim: true },
    textFontSize: {
        base: { type: String, required: true, trim: true },
        md: { type: String, required: true, trim: true }
    },
    textColor: { type: String, required: true, trim: true },
    linkMarginLeft: {
        base: { type: String, required: true, trim: true },
        md: { type: String, required: true, trim: true }
    },
    icons: [{ type: String, required: true }]
});
const SocialNetworkStyle = (0, mongoose_1.model)('SocialNetworkStyle', socialNetworkStyleSchema);
exports.default = SocialNetworkStyle;
