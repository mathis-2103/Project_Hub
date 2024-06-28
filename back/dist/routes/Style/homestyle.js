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
exports.homestyleRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const HomeComponentStyle_1 = __importDefault(require("../../models/Style/HomeComponentStyle"));
const router = express_1.default.Router();
exports.homestyleRouter = router;
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.get('/api/homestyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const homestyle = yield HomeComponentStyle_1.default.find();
        res.json(homestyle);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.post('/api/homestyle', upload.single('bgImage'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const homeStyle = new HomeComponentStyle_1.default({
        bgImage: req.file.path,
        overlayBgColor: req.body.overlayBgColor,
        titleFontSize: req.body.titleFontSize,
        titleColor: req.body.titleColor,
        subTitleFontSize: req.body.subTitleFontSize,
        subTitleColor: req.body.subTitleColor,
    });
    try {
        const newHomeStyle = yield homeStyle.save();
        res.status(201).json(newHomeStyle);
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
}));
router.put('/api/homestyle/:id', upload.single('bgImage'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const homeStyle = yield HomeComponentStyle_1.default.findById(req.params.id);
        if (!homeStyle) {
            return res.status(404).json({ message: 'Home style not found' });
        }
        if (req.file) {
            homeStyle.bgImage = req.file.path;
        }
        homeStyle.overlayBgColor = req.body.overlayBgColor;
        homeStyle.titleFontSize = req.body.titleFontSize;
        homeStyle.titleColor = req.body.titleColor;
        homeStyle.subTitleFontSize = req.body.subTitleFontSize;
        homeStyle.subTitleColor = req.body.subTitleColor;
        yield homeStyle.save();
        res.json({ message: 'Home style updated', homeStyle });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/api/homestyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const homeStyle = yield HomeComponentStyle_1.default.findById(req.params.id);
        if (!homeStyle) {
            return res.status(404).json({ message: 'Home style not found' });
        }
        yield homeStyle.deleteOne();
        res.json({ message: 'Home style deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
