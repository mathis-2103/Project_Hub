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
// routes/category.js
const express_1 = __importDefault(require("express"));
const category_1 = __importDefault(require("../models/category"));
const router = express_1.default.Router();
router.get('/api/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.default.find();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.post('/api/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = new category_1.default({
        name: req.body.name
    });
    try {
        const newCategory = yield category.save();
        res.status(201).json(newCategory);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.default.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        yield category.deleteOne();
        res.json({ message: 'Category deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
