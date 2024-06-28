"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const shopComponentStyleSchema = new mongoose_1.Schema({
    containerBgColor: { type: String, required: true, trim: true },
    textColor: { type: String, required: true, trim: true },
    titleFontSize: {
        base: { type: String, required: true, trim: true },
        md: { type: String, required: true, trim: true }
    },
    containerPaddingY: { type: Number, required: true },
    containerPaddingX: { type: Number, required: true },
    titleMarginY: { type: Number, required: true },
    iframeWidth: { type: String, required: true, trim: true },
    iframeHeight: { type: String, required: true, trim: true },
    iframeBorder: { type: String, required: true, trim: true }
});
const ShopComponentStyle = (0, mongoose_1.model)('ShopComponentStyle', shopComponentStyleSchema);
exports.default = ShopComponentStyle;
