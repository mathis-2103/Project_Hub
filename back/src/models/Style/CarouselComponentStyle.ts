import mongoose, { Schema, Document, model } from 'mongoose';

interface ICarouselComponentStyle extends Document {
    containerBgColor: string;
    textColor: string;
    titleFontSize: string;
    titleFontColor: string;
    carouselBgColor: string;
    arrowColor: string;
    imageBorderColor: string;
    imageBorderWidth: string;
    imageMaxHeight: string;
}

const carouselComponentStyleSchema: Schema = new Schema({
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

const CarouselComponentStyle = model<ICarouselComponentStyle>('CarouselComponentStyle', carouselComponentStyleSchema);

export default CarouselComponentStyle;
