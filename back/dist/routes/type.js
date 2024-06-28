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
// routes/title.js
const express_1 = __importDefault(require("express"));
const title_1 = __importDefault(require("../models/title"));
const category_1 = __importDefault(require("../models/category"));
const router = express_1.default.Router();
// Get all titles
router.get('/api/titles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const titles = yield title_1.default.find().populate('category');
        res.json(titles);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Create a new title
router.post('/api/titles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category: categoryName } = req.body;
    try {
        const category = yield category_1.default.findOne({ name: categoryName });
        if (!category) {
            return res.status(400).json({ message: 'Category not found' });
        }
        const title = new title_1.default({
            name,
            category: category._id
        });
        const newTitle = yield title.save();
        res.status(201).json(newTitle);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Delete a title
router.delete('/api/titles/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const title = yield title_1.default.findById(req.params.id);
        if (!title) {
            return res.status(404).json({ message: 'Title not found' });
        }
        yield title.deleteOne();
        res.json({ message: 'Title deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
