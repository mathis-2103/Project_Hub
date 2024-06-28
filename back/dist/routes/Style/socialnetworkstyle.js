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
exports.socialNetworkStyleRouter = void 0;
const express_1 = __importDefault(require("express"));
const SocialNetworkComponentStyle_1 = __importDefault(require("../../models/Style/SocialNetworkComponentStyle"));
const router = express_1.default.Router();
exports.socialNetworkStyleRouter = router;
const defaultSocialNetworkStyle = {
    name: 'default',
    containerBgColor: '#ffffff',
    titleFontSize: { base: '16px', md: '20px' },
    titleColor: '#000000',
    iconSize: { base: '24px', md: '32px' },
    iconMarginBottom: '8px',
    iconMarginRight: '8px',
    iconTransition: '0.3s',
    textFontSize: { base: '14px', md: '16px' },
    textColor: '#000000',
    linkMarginLeft: { base: '4px', md: '8px' },
    icons: ['facebook', 'twitter', 'linkedin']
};
router.get('/api/socialnetworkstyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let socialNetworkStyle = yield SocialNetworkComponentStyle_1.default.findOne();
        if (!socialNetworkStyle) {
            socialNetworkStyle = new SocialNetworkComponentStyle_1.default(defaultSocialNetworkStyle);
            yield socialNetworkStyle.save();
        }
        res.json(socialNetworkStyle);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.post('/api/socialnetworkstyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const socialNetworkStyle = new SocialNetworkComponentStyle_1.default(req.body);
    try {
        const newSocialNetworkStyle = yield socialNetworkStyle.save();
        res.status(201).json(newSocialNetworkStyle);
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
}));
router.put('/api/socialnetworkstyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const socialNetworkStyle = yield SocialNetworkComponentStyle_1.default.findById(req.params.id);
        if (!socialNetworkStyle) {
            return res.status(404).json({ message: 'Social Network Style not found' });
        }
        Object.assign(socialNetworkStyle, req.body);
        yield socialNetworkStyle.save();
        res.json({ message: 'Social Network Style updated', socialNetworkStyle });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/api/socialnetworkstyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const socialNetworkStyle = yield SocialNetworkComponentStyle_1.default.findById(req.params.id);
        if (!socialNetworkStyle) {
            return res.status(404).json({ message: 'Social Network Style not found' });
        }
        yield socialNetworkStyle.deleteOne();
        res.json({ message: 'Social Network Style deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
