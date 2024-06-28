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
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../models/product"));
const router = express_1.default.Router();
exports.productRouter = router;
router.get('/api/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.post('/api/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new product_1.default(req.body);
    try {
        const newProduct = yield product.save();
        res.status(201).json(newProduct);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.put('/api/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        Object.assign(product, req.body);
        yield product.save();
        res.json(product);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/api/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        yield product.deleteOne();
        res.json({ message: 'Product deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
