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
exports.partnersStyleRouter = void 0;
const express_1 = __importDefault(require("express"));
const PartenersComponentStyle_1 = __importDefault(require("../../models/Style/PartenersComponentStyle"));
const router = express_1.default.Router();
exports.partnersStyleRouter = router;
const defaultPartnersStyle = {
    containerBgColor: '#ffffff',
    containerPaddingY: 20,
    titleFontSize: '24px',
    titleColor: '#000000',
    gridSpacing: 10,
    imageMaxHeight: '300px',
    imageBoxSize: '200px',
    imageBorderRadius: '10px',
    hoverScale: 'scale(1.05)',
};
router.get('/api/partnerSstyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let partnersStyle = yield PartenersComponentStyle_1.default.findOne();
        if (!partnersStyle) {
            partnersStyle = new PartenersComponentStyle_1.default(defaultPartnersStyle);
            yield partnersStyle.save();
        }
        res.json(partnersStyle);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.post('/api/partnersStyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const partnersStyle = new PartenersComponentStyle_1.default(req.body);
    try {
        const newPartnersStyle = yield partnersStyle.save();
        res.status(201).json(newPartnersStyle);
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
}));
router.put('/api/partnersStyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partnersStyle = yield PartenersComponentStyle_1.default.findById(req.params.id);
        if (!partnersStyle) {
            return res.status(404).json({ message: 'Partners style not found' });
        }
        Object.assign(partnersStyle, req.body);
        yield partnersStyle.save();
        res.json({ message: 'Partners style updated', partnersStyle });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/api/partnersStyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partnersStyle = yield PartenersComponentStyle_1.default.findById(req.params.id);
        if (!partnersStyle) {
            return res.status(404).json({ message: 'Partners style not found' });
        }
        yield partnersStyle.deleteOne();
        res.json({ message: 'Partners style deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
