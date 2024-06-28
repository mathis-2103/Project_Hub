import mongoose, { model } from 'mongoose';

interface AvisStyle {
    bgColor: string;
    cardBgColor: string;
    cardHoverBgColor: string;
    cardTextColor: string;
    cardHoverTransform: string;
    cardBoxShadow: string;
    cardHoverBoxShadow: string;
    titleFontSize: string;
    titleFontColor: string;
    reviewFontSize: string;
    reviewFontColor: string;
    authorFontSize: string;
    authorFontColor: string;
    starMarginRight: string;
    transition: string;
}

const AvisStyleSchema = new mongoose.Schema({
    bgColor: { type: String, required: true, trim: true },
    cardBgColor: { type: String, required: true, trim: true },
    cardHoverBgColor: { type: String, required: true, trim: true },
    cardTextColor: { type: String, required: true, trim: true },
    cardHoverTransform: { type: String, required: true, trim: true },
    cardBoxShadow: { type: String, required: true, trim: true },
    cardHoverBoxShadow: { type: String, required: true, trim: true },
    titleFontSize: { type: String, required: true, trim: true },
    titleFontColor: { type: String, required: true, trim: true },
    reviewFontSize: { type: String, required: true, trim: true },
    reviewFontColor: { type: String, required: true, trim: true },
    authorFontSize: { type: String, required: true, trim: true },
    authorFontColor: { type: String, required: true, trim: true },
    starMarginRight: { type: String, required: true, trim: true },
    transition: { type: String, required: true, trim: true },
});

const AvisStyle = model<AvisStyle>('AvisStyle', AvisStyleSchema);

export default AvisStyle;
