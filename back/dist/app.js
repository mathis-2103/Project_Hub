"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const mongodb_1 = require("./mongodb");
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./routes/auth");
const profile_1 = require("./routes/profile");
const update_1 = require("./routes/update");
const schedule_1 = require("./routes/schedule");
const image_1 = require("./routes/image");
const category_1 = __importDefault(require("./routes/category"));
const title_1 = __importDefault(require("./routes/title"));
const product_1 = require("./routes/product");
const homestyle_1 = require("./routes/Style/homestyle");
const avisstyle_1 = require("./routes/Style/avisstyle");
const partenersstyle_1 = require("./routes/Style/partenersstyle");
const socialnetworkstyle_1 = require("./routes/Style/socialnetworkstyle");
const carouselstylerouter_1 = require("./routes/Style/carouselstylerouter");
const mapsitestylesouter_1 = require("./routes/Style/mapsitestylesouter");
const shopstylerouter_1 = require("./routes/Style/shopstylerouter");
const contactstyle_1 = require("./routes/Style/contactstyle");
const scheductstyle_1 = require("./routes/Style/scheductstyle");
const productliststyle_1 = require("./routes/Style/productliststyle");
const APP = (0, express_1.default)();
APP.get('/api/ping', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send('Pong');
}));
APP.get('/api/status', (_req, res) => {
    res.sendStatus((0, mongodb_1.isConnected)() ? 200 : 500);
});
APP.use((0, cors_1.default)());
APP.use((0, express_1.json)());
APP.use(auth_1.authRouter);
APP.use(profile_1.profileRouter);
APP.use(update_1.updateRouter);
APP.use(category_1.default);
APP.use(title_1.default);
APP.use(schedule_1.scheduleRouter);
APP.use(image_1.imageRouter);
APP.use(product_1.productRouter);
APP.use(homestyle_1.homestyleRouter);
APP.use(avisstyle_1.avisStyleRouter);
APP.use(partenersstyle_1.partnersStyleRouter);
APP.use(socialnetworkstyle_1.socialNetworkStyleRouter);
APP.use(carouselstylerouter_1.carouselStyleRouter);
APP.use(mapsitestylesouter_1.mapSiteStyleRouter);
APP.use(shopstylerouter_1.shopStyleRouter);
APP.use(contactstyle_1.contactStyleRouter);
APP.use(scheductstyle_1.scheduleStyleRouter);
APP.use(productliststyle_1.productListStyleRouter);
exports.default = APP;
