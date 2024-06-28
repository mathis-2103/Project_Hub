"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const scheduleComponentStyleSchema = new mongoose_1.Schema({
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
const ScheduleComponentStyle = (0, mongoose_1.model)('ScheduleComponentStyle', scheduleComponentStyleSchema);
exports.default = ScheduleComponentStyle;
