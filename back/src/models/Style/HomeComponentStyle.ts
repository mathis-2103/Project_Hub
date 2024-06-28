import mongoose, { model } from 'mongoose';

interface HomeStyle {
    bgImage: string;
    overlayBgColor: string;
    titleFontSize: string;
    titleColor: string;
    subTitleFontSize:string;
    subTitleColor: string;
}

const HomeStyleSchema = new mongoose.Schema({
    bgImage: {
        type: String,
        required: true,
        trim: true
    },
    overlayBgColor: {
        type: String,
        required: true,
        trim: true
    },
    titleFontSize: {
        type: String,
        required: true,
        trim: true
    },
    titleColor: {
        type: String,
        required: true,
        trim: true
    },
    subTitleFontSize: {
        type: String,
        required: true,
        trim: true
    },
    subTitleColor: {
        type: String,
        required: true,
        trim: true
    },
});

const HomeStyle = model<HomeStyle>('HomeStyle', HomeStyleSchema);

export default HomeStyle;