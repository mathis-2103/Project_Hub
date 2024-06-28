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
exports.customerRouter = void 0;
// routes/customerRoutes.ts
const express_1 = __importDefault(require("express"));
const Customer_1 = __importDefault(require("../models/Client/Customer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
exports.customerRouter = router;
// Inscription
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingCustomer = yield Customer_1.default.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ email: 'Cet email est déjà utilisé.' });
        }
        const newCustomer = new Customer_1.default({ email, password });
        yield newCustomer.save();
        res.status(201).json({ message: 'Inscription réussie' });
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur lors de l\'inscription', error: err.message });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const customer = yield Customer_1.default.findOne({ email });
        if (!customer) {
            return res.status(400).json({ email: 'Email non trouvé.' });
        }
        const isMatch = yield customer.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ password: 'Mot de passe incorrect.' });
        }
        const token = jsonwebtoken_1.default.sign({ id: customer._id, email: customer.email }, 'votre_secret_key', { expiresIn: '1h' });
        res.json({ message: 'Connexion réussie', token });
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error: err.message });
    }
}));
