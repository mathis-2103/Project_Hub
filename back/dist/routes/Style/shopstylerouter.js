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
exports.shopStyleRouter = void 0;
const express_1 = __importDefault(require("express"));
const ShopComponentStyle_1 = __importDefault(require("../../models/Style/ShopComponentStyle"));
const router = express_1.default.Router();
exports.shopStyleRouter = router;
const defaultShopComponentStyle = {
    containerBgColor: '#ffffff',
    textColor: '#000000',
    titleFontSize: { base: '16px', md: '20px' },
    containerPaddingY: 16,
    containerPaddingX: 16,
    titleMarginY: 8,
    iframeWidth: '100%',
    iframeHeight: '600px',
    iframeBorder: '1px solid #ccc'
};
router.get('/api/shopstyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let shopComponentStyle = yield ShopComponentStyle_1.default.findOne();
        if (!shopComponentStyle) {
            shopComponentStyle = new ShopComponentStyle_1.default(defaultShopComponentStyle);
            yield shopComponentStyle.save();
        }
        res.json(shopComponentStyle);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.post('/api/shopstyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shopComponentStyle = new ShopComponentStyle_1.default(req.body);
    try {
        const newShopComponentStyle = yield shopComponentStyle.save();
        res.status(201).json(newShopComponentStyle);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.put('/api/shopstyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shopComponentStyle = yield ShopComponentStyle_1.default.findById(req.params.id);
        if (!shopComponentStyle) {
            return res.status(404).json({ message: 'Shop Component Style not found' });
        }
        Object.assign(shopComponentStyle, req.body);
        yield shopComponentStyle.save();
        res.json({ message: 'Shop Component Style updated', shopComponentStyle });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/api/shopstyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shopComponentStyle = yield ShopComponentStyle_1.default.findById(req.params.id);
        if (!shopComponentStyle) {
            return res.status(404).json({ message: 'Shop Component Style not found' });
        }
        yield shopComponentStyle.deleteOne();
        res.json({ message: 'Shop Component Style deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
