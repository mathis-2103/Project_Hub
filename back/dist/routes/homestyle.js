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
const express_1 = __importDefault(require("express"));
const HomeComponentStyle_js_1 = __importDefault(require("../models/Style/HomeComponentStyle.js"));
const router = express_1.default.Router();
// Route pour récupérer tous les styles
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const styles = yield HomeComponentStyle_js_1.default.find();
        res.json(styles);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Route pour créer un nouveau style
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const style = new HomeComponentStyle_js_1.default({
        bgImage: req.body.bgImage,
        overlayBgColor: req.body.overlayBgColor,
        titleFontSize: req.body.titleFontSize,
        titleColor: req.body.titleColor,
        subTitleFontSize: req.body.subTitleFontSize,
        subTitleColor: req.body.subTitleColor
    });
    try {
        const newStyle = yield style.save();
        res.status(201).json(newStyle);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Route pour récupérer un style par ID
router.get('/:id', getStyle, (req, res) => {
    res.json(res.locals.style);
});
// Middleware pour obtenir un style par ID
function getStyle(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let style;
        try {
            style = yield HomeComponentStyle_js_1.default.findById(req.params.id);
            if (!style) {
                return res.status(404).json({ message: 'Cannot find style' });
            }
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
        res.locals.style = style;
        next();
    });
}
exports.default = router;
