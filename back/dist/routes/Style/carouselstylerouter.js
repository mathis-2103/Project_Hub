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
exports.carouselStyleRouter = void 0;
const express_1 = __importDefault(require("express"));
const CarouselComponentStyle_1 = __importDefault(require("../../models/Style/CarouselComponentStyle"));
const router = express_1.default.Router();
exports.carouselStyleRouter = router;
const defaultCarouselComponentStyle = {
    containerBgColor: '#ffffff',
    textColor: '#000000',
    titleFontSize: '24px',
    titleFontColor: '#000000',
    carouselBgColor: '#ffffff',
    arrowColor: '#000000',
    imageBorderColor: '#cccccc',
    imageBorderWidth: '2px',
    imageMaxHeight: '400px'
};
router.get('/api/carouselstyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let carouselComponentStyle = yield CarouselComponentStyle_1.default.findOne();
        if (!carouselComponentStyle) {
            carouselComponentStyle = new CarouselComponentStyle_1.default(defaultCarouselComponentStyle);
            yield carouselComponentStyle.save();
        }
        res.json(carouselComponentStyle);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.post('/api/carouselstyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carouselComponentStyle = new CarouselComponentStyle_1.default(req.body);
    try {
        const newCarouselComponentStyle = yield carouselComponentStyle.save();
        res.status(201).json(newCarouselComponentStyle);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.put('/api/carouselstyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carouselComponentStyle = yield CarouselComponentStyle_1.default.findById(req.params.id);
        if (!carouselComponentStyle) {
            return res.status(404).json({ message: 'Carousel Component Style not found' });
        }
        Object.assign(carouselComponentStyle, req.body);
        yield carouselComponentStyle.save();
        res.json({ message: 'Carousel Component Style updated', carouselComponentStyle });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/api/carouselstyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carouselComponentStyle = yield CarouselComponentStyle_1.default.findById(req.params.id);
        if (!carouselComponentStyle) {
            return res.status(404).json({ message: 'Carousel Component Style not found' });
        }
        yield carouselComponentStyle.deleteOne();
        res.json({ message: 'Carousel Component Style deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
