import mongoose, { Schema, Document, model } from 'mongoose';

interface IContactComponentStyle extends Document {
    containerBgColor: string;
    formBgColor: string;
    inputBorderColor: string;
    inputTextColor: string;
    buttonBgColor: string;
    buttonHoverBgColor: string;
    buttonTextColor: string;
    titleFontSize: string;
    titleFontColor: string;
}

const contactComponentStyleSchema: Schema = new Schema({
    containerBgColor: { type: String, required: true, trim: true },
    formBgColor: { type: String, required: true, trim: true },
    inputBorderColor: { type: String, required: true, trim: true },
    inputTextColor: { type: String, required: true, trim: true },
    buttonBgColor: { type: String, required: true, trim: true },
    buttonHoverBgColor: { type: String, required: true, trim: true },
    buttonTextColor: { type: String, required: true, trim: true },
    titleFontSize: { type: String, required: true, trim: true },
    titleFontColor: { type: String, required: true, trim: true },
});

const ContactComponentStyle = model<IContactComponentStyle>('ContactComponentStyle', contactComponentStyleSchema);

export default ContactComponentStyle;
