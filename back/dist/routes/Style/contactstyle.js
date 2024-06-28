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
exports.contactStyleRouter = void 0;
const express_1 = __importDefault(require("express"));
const ContactComponentStyle_1 = __importDefault(require("../../models/Style/ContactComponentStyle"));
const router = express_1.default.Router();
exports.contactStyleRouter = router;
const defaultContactComponentStyle = {
    containerBgColor: '#ffffff',
    formBgColor: '#f7f7f7',
    inputBorderColor: '#cccccc',
    inputTextColor: '#000000',
    buttonBgColor: '#007bff',
    buttonHoverBgColor: '#0056b3',
    buttonTextColor: '#ffffff',
    titleFontSize: '24px',
    titleFontColor: '#000000',
};
router.get('/api/contactstyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let contactComponentStyle = yield ContactComponentStyle_1.default.findOne();
        if (!contactComponentStyle) {
            contactComponentStyle = new ContactComponentStyle_1.default(defaultContactComponentStyle);
            yield contactComponentStyle.save();
        }
        res.json(contactComponentStyle);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.post('/api/contactstyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contactComponentStyle = new ContactComponentStyle_1.default(req.body);
    try {
        const newContactComponentStyle = yield contactComponentStyle.save();
        res.status(201).json(newContactComponentStyle);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.put('/api/contactstyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactComponentStyle = yield ContactComponentStyle_1.default.findById(req.params.id);
        if (!contactComponentStyle) {
            return res.status(404).json({ message: 'Contact Component Style not found' });
        }
        Object.assign(contactComponentStyle, req.body);
        yield contactComponentStyle.save();
        res.json({ message: 'Contact Component Style updated', contactComponentStyle });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/api/contactstyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactComponentStyle = yield ContactComponentStyle_1.default.findById(req.params.id);
        if (!contactComponentStyle) {
            return res.status(404).json({ message: 'Contact Component Style not found' });
        }
        yield contactComponentStyle.deleteOne();
        res.json({ message: 'Contact Component Style deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
