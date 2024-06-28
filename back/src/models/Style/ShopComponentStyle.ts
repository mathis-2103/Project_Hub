import mongoose, { Schema, Document, model } from 'mongoose';

interface IShopComponentStyle extends Document {
    containerBgColor: string;
    textColor: string;
    titleFontSize: { base: string, md: string };
    containerPaddingY: number;
    containerPaddingX: number;
    titleMarginY: number;
    iframeWidth: string;
    iframeHeight: string;
    iframeBorder: string;
}

const shopComponentStyleSchema: Schema = new Schema({
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

const ShopComponentStyle = model<IShopComponentStyle>('ShopComponentStyle', shopComponentStyleSchema);

export default ShopComponentStyle;
