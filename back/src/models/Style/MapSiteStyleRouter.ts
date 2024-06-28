import mongoose, { Schema, Document, model } from 'mongoose';

interface IMapSiteComponentStyle extends Document {
    containerBgColor: string;
    containerPadding: string;
    containerMinHeight: string;
    boxMarginX: string;
    boxMarginY: string;
    boxMarginBottom: string;
    titleColor: string;
    titleFontSize: string[];
    titleMarginBottom: string;
    textColor: string;
    textFontSize: string[];
}

const mapSiteComponentStyleSchema: Schema = new Schema({
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

const MapSiteComponentStyle = model<IMapSiteComponentStyle>('MapSiteComponentStyle', mapSiteComponentStyleSchema);

export default MapSiteComponentStyle;
