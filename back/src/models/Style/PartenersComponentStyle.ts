import mongoose, { Schema, Document, model } from 'mongoose';

interface IPartnersStyle extends Document {
    containerBgColor: string;
    containerPaddingY: number;
    titleFontSize: string;
    titleColor: string;
    gridSpacing: number;
    imageMaxHeight: string;
    imageBoxSize: string;
    imageBorderRadius: string;
    hoverScale: string;
}

const PartnersStyleSchema: Schema = new Schema({
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

const PartnersStyle = model<IPartnersStyle>('PartnersStyle', PartnersStyleSchema);

export default PartnersStyle;
