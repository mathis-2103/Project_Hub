"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleStyleRouter = void 0;
const express_1 = __importDefault(require("express"));
const ScheduleComponentStyle_1 = __importDefault(require("../../models/Style/ScheduleComponentStyle"));
const router = express_1.default.Router();
exports.scheduleStyleRouter = router;
const defaultScheduleComponentStyle = {
    containerBgColor: '#EEE6D8',
    textColor: 'black',
    hoverTextColor: 'black',
    tableBgColor: '#D3D3D3',
    tableBorderColor: 'black',
    tableBoxShadow: 'md',
    closedTextColor: 'red.500',
    titleFontSize: { base: '4xl', md: '6xl' },
    titleHoverScale: 'scale(1.1)',
    titleAfterHeight: '1px',
    titleAfterBgColor: 'black'
};
router.get('/api/schedulestyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let scheduleComponentStyle = yield ScheduleComponentStyle_1.default.findOne();
        if (!scheduleComponentStyle) {
            scheduleComponentStyle = new ScheduleComponentStyle_1.default(defaultScheduleComponentStyle);
            yield scheduleComponentStyle.save();
        }
        res.json(scheduleComponentStyle);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.post('/api/schedulestyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleComponentStyle = new ScheduleComponentStyle_1.default(req.body);
    try {
        const newScheduleComponentStyle = yield scheduleComponentStyle.save();
        res.status(201).json(newScheduleComponentStyle);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.put('/api/schedulestyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scheduleComponentStyle = yield ScheduleComponentStyle_1.default.findById(req.params.id);
        if (!scheduleComponentStyle) {
            return res.status(404).json({ message: 'Schedule Component Style not found' });
        }
        Object.assign(scheduleComponentStyle, req.body);
        yield scheduleComponentStyle.save();
        res.json({ message: 'Schedule Component Style updated', scheduleComponentStyle });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/api/schedulestyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scheduleComponentStyle = yield ScheduleComponentStyle_1.default.findById(req.params.id);
        if (!scheduleComponentStyle) {
            return res.status(404).json({ message: 'Schedule Component Style not found' });
        }
        yield scheduleComponentStyle.deleteOne();
        res.json({ message: 'Schedule Component Style deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
