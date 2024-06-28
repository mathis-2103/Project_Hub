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
exports.mapSiteStyleRouter = void 0;
const express_1 = __importDefault(require("express"));
const MapSiteComponentStyle_1 = __importDefault(require("../../models/Style/MapSiteComponentStyle"));
const router = express_1.default.Router();
exports.mapSiteStyleRouter = router;
const defaultMapSiteComponentStyle = {
    containerBgColor: '#ffffff',
    containerPadding: '16px',
    containerMinHeight: '300px',
    boxMarginX: '8px',
    boxMarginY: '8px',
    boxMarginBottom: '16px',
    titleColor: '#000000',
    titleFontSize: ['16px', '20px'],
    titleMarginBottom: '8px',
    textColor: '#000000',
    textFontSize: ['14px', '16px']
};
router.get('/api/mapsitestyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let mapSiteComponentStyle = yield MapSiteComponentStyle_1.default.findOne();
        if (!mapSiteComponentStyle) {
            mapSiteComponentStyle = new MapSiteComponentStyle_1.default(defaultMapSiteComponentStyle);
            yield mapSiteComponentStyle.save();
        }
        res.json(mapSiteComponentStyle);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.post('/api/mapsitestyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mapSiteComponentStyle = new MapSiteComponentStyle_1.default(req.body);
    try {
        const newMapSiteComponentStyle = yield mapSiteComponentStyle.save();
        res.status(201).json(newMapSiteComponentStyle);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.put('/api/mapsitestyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mapSiteComponentStyle = yield MapSiteComponentStyle_1.default.findById(req.params.id);
        if (!mapSiteComponentStyle) {
            return res.status(404).json({ message: 'Map Site Component Style not found' });
        }
        Object.assign(mapSiteComponentStyle, req.body);
        yield mapSiteComponentStyle.save();
        res.json({ message: 'Map Site Component Style updated', mapSiteComponentStyle });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/api/mapsitestyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mapSiteComponentStyle = yield MapSiteComponentStyle_1.default.findById(req.params.id);
        if (!mapSiteComponentStyle) {
            return res.status(404).json({ message: 'Map Site Component Style not found' });
        }
        yield mapSiteComponentStyle.deleteOne();
        res.json({ message: 'Map Site Component Style deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
