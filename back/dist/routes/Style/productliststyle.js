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
exports.productListStyleRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProductListStyle_1 = __importDefault(require("../../models/Style/ProductListStyle"));
const router = express_1.default.Router();
exports.productListStyleRouter = router;
const defaultProductListStyle = {
    modalBgColor: "#FFFFFF",
    modalHeaderBorderColor: "gray.200",
    modalBodyBgColor: "gray.100",
    modalContentBorderColor: "#e2e8f0",
    textColors: {
        name: "gray.800",
        description: "gray.600",
        price: "teal.500",
        category: "gray.500",
        material: "gray.800",
    },
    buttonStyles: {
        sizeButtonBgColor: "gray.200",
        sizeButtonBorderColor: "gray.300",
        sizeButtonTextColor: "gray.800",
        sizeButtonHoverBg: "gray.50",
        addToCartButtonColorScheme: "teal",
        addToCartButtonHoverBg: "teal.600",
    },
    textSize: {
        header: "2xl",
        price: "2xl",
        name: "lg",
        description: "md",
        material: "md",
    },
    modalBoxSize: "400px",
    bgColor: "#FFFFFF",
    priceColor: "gray.500",
    borderColor: "#E2E2E2",
    boxSize: "250px",
    fontSizeName: "xl",
    fontSizePrice: "md",
    sizeTitre: "6xl",
    textColor: "#000000",
    dividerColor: "#FF5100",
    sizeText: "2xl",
    secondaryTextColor: "#555555",
};
router.get('/api/productliststyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let productListStyle = yield ProductListStyle_1.default.findOne();
        if (!productListStyle) {
            productListStyle = new ProductListStyle_1.default(defaultProductListStyle);
            yield productListStyle.save();
        }
        res.json(productListStyle);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.post('/api/productliststyle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productListStyle = new ProductListStyle_1.default(req.body);
    try {
        const newProductListStyle = yield productListStyle.save();
        res.status(201).json(newProductListStyle);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.put('/api/productliststyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productListStyle = yield ProductListStyle_1.default.findById(req.params.id);
        if (!productListStyle) {
            return res.status(404).json({ message: 'Product List Style not found' });
        }
        Object.assign(productListStyle, req.body);
        yield productListStyle.save();
        res.json({ message: 'Product List Style updated', productListStyle });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/api/productliststyle/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productListStyle = yield ProductListStyle_1.default.findById(req.params.id);
        if (!productListStyle) {
            return res.status(404).json({ message: 'Product List Style not found' });
        }
        yield productListStyle.deleteOne();
        res.json({ message: 'Product List Style deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
