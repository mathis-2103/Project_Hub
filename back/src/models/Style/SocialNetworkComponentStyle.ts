import mongoose, { Schema, Document, model } from 'mongoose';

interface ISocialNetworkStyle extends Document {
    id?: string;
    name: string;
    containerBgColor: string;
    titleFontSize: { base: string, md: string };
    titleColor: string;
    iconSize: { base: string, md: string };
    iconMarginBottom: string;
    iconMarginRight: string;
    iconTransition: string;
    textFontSize: { base: string, md: string };
    textColor: string;
    linkMarginLeft: { base: string, md: string };
    icons: string[];
}

const socialNetworkStyleSchema: Schema = new Schema({
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

const SocialNetworkStyle = model<ISocialNetworkStyle>('SocialNetworkStyle', socialNetworkStyleSchema);

export default SocialNetworkStyle;
