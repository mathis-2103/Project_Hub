import mongoose, { Schema, Document, model } from 'mongoose';

interface IScheduleComponentStyle extends Document {
    containerBgColor: string;
    textColor: string;
    hoverTextColor: string;
    tableBgColor: string;
    tableBorderColor: string;
    tableBoxShadow: string;
    closedTextColor: string;
    titleFontSize: { base: string, md: string };
    titleHoverScale: string;
    titleAfterHeight: string;
    titleAfterBgColor: string;
}

const scheduleComponentStyleSchema: Schema = new Schema({
    containerBgColor: { type: String, required: true, trim: true },
    textColor: { type: String, required: true, trim: true },
    hoverTextColor: { type: String, required: true, trim: true },
    tableBgColor: { type: String, required: true, trim: true },
    tableBorderColor: { type: String, required: true, trim: true },
    tableBoxShadow: { type: String, required: true, trim: true },
    closedTextColor: { type: String, required: true, trim: true },
    titleFontSize: {
        base: { type: String, required: true, trim: true },
        md: { type: String, required: true, trim: true }
    },
    titleHoverScale: { type: String, required: true, trim: true },
    titleAfterHeight: { type: String, required: true, trim: true },
    titleAfterBgColor: { type: String, required: true, trim: true }
});

const ScheduleComponentStyle = model<IScheduleComponentStyle>('ScheduleComponentStyle', scheduleComponentStyleSchema);

export default ScheduleComponentStyle;
