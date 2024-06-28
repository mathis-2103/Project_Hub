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
exports.avisStyleRouter = void 0;
const express_1 = __importDefault(require("express"));
const AvisComponentStyle_1 = __importDefault(require("../../models/Style/AvisComponentStyle"));
const router = express_1.default.Router();
exports.avisStyleRouter = router;
const defaultAvisStyle = {
    bgColor: '#ffffff',
    cardBgColor: '#ffffff',
    cardHoverBgColor: '#ffffff',
    cardTextColor: '#000000',
    cardHoverTransform: 'scale(1.05)',
    cardBoxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cardHoverBoxShadow: '0 6px 8px rgba(0, 0, 0, 0.1)',
    titleFontSize: '16px',
    titleFontColor: '#000000',
    reviewFontSize: '14px',
    reviewFontColor: '#000000',
    authorFontSize: '12px',
    authorFontColor: '#000000',
    starMarginRight: '8px',
    transition: '0.3s ease-in-out',
};
router.get('/api/avisstyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let avisStyle = yield AvisComponentStyle_1.default.findOne();
        if (!avisStyle) {
            avisStyle = new AvisComponentStyle_1.default(defaultAvisStyle);
            yield avisStyle.save();
        }
        res.json(avisStyle);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.post('/api/avisstyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const avisStyle = new AvisComponentStyle_1.default(req.body);
    try {
        const newAvisStyle = yield avisStyle.save();
        res.status(201).json(newAvisStyle);
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
}));
router.put('/api/avisstyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avisStyle = yield AvisComponentStyle_1.default.findById(req.params.id);
        if (!avisStyle) {
            return res.status(404).json({ message: 'Avis style not found' });
        }
        Object.assign(avisStyle, req.body);
        yield avisStyle.save();
        res.json({ message: 'Avis style updated', avisStyle });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/api/avisstyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avisStyle = yield AvisComponentStyle_1.default.findById(req.params.id);
        if (!avisStyle) {
            return res.status(404).json({ message: 'Avis style not found' });
        }
        yield avisStyle.deleteOne();
        res.json({ message: 'Avis style deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
