"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productListStyleSchema = new mongoose_1.Schema({
    modalBgColor: { type: String, required: true, trim: true },
    modalHeaderBorderColor: { type: String, required: true, trim: true },
    modalBodyBgColor: { type: String, required: true, trim: true },
    modalContentBorderColor: { type: String, required: true, trim: true },
    textColors: {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        price: { type: String, required: true, trim: true },
        category: { type: String, required: true, trim: true },
        material: { type: String, required: true, trim: true },
    },
    buttonStyles: {
        sizeButtonBgColor: { type: String, required: true, trim: true },
        sizeButtonBorderColor: { type: String, required: true, trim: true },
        sizeButtonTextColor: { type: String, required: true, trim: true },
        sizeButtonHoverBg: { type: String, required: true, trim: true },
        addToCartButtonColorScheme: { type: String, required: true, trim: true },
        addToCartButtonHoverBg: { type: String, required: true, trim: true },
    },
    textSize: {
        header: { type: String, required: true, trim: true },
        price: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        material: { type: String, required: true, trim: true },
    },
    modalBoxSize: { type: String, required: true, trim: true },
    bgColor: { type: String, required: true, trim: true },
    priceColor: { type: String, required: true, trim: true },
    borderColor: { type: String, required: true, trim: true },
    boxSize: { type: String, required: true, trim: true },
    fontSizeName: { type: String, required: true, trim: true },
    fontSizePrice: { type: String, required: true, trim: true },
    sizeTitre: { type: String, required: true, trim: true },
    textColor: { type: String, required: true, trim: true },
    dividerColor: { type: String, required: true, trim: true },
    sizeText: { type: String, required: true, trim: true },
    secondaryTextColor: { type: String, required: true, trim: true },
});
const ProductListStyle = (0, mongoose_1.model)('ProductListStyle', productListStyleSchema);
exports.default = ProductListStyle;
