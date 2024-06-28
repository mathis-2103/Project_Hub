import express, { json } from 'express';
import { connect, isConnected } from './mongodb';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { profileRouter } from './routes/profile';
import { updateRouter } from './routes/update';
import { scheduleRouter } from './routes/schedule';
import { imageRouter } from './routes/image';
import categoryRouter from './routes/category';
import titleRouter from './routes/title'
import {productRouter} from "./routes/product";
import {homestyleRouter} from "./routes/Style/homestyle";
import {avisStyleRouter} from "./routes/Style/avisstyle";
import {partnersStyleRouter} from "./routes/Style/partenersstyle";
import {socialNetworkStyleRouter} from "./routes/Style/socialnetworkstyle";
import {carouselStyleRouter} from "./routes/Style/carouselstylerouter";
import {mapSiteStyleRouter} from "./routes/Style/mapsitestylesouter";
import {shopStyleRouter} from "./routes/Style/shopstylerouter";
import {contactStyleRouter} from "./routes/Style/contactstyle";
import {scheduleStyleRouter} from "./routes/Style/scheductstyle";
import {productListStyleRouter} from "./routes/Style/productliststyle";

const APP = express();


APP.get('/api/ping', async (_req, res) => {
    res.status(200).send('Pong');
});

APP.get('/api/status', (_req, res) => {
    res.sendStatus(isConnected() ? 200 : 500);
});

APP.use(cors());
APP.use(json());
APP.use(authRouter);
APP.use(profileRouter);
APP.use(updateRouter);
APP.use(categoryRouter);
APP.use(titleRouter);
APP.use(scheduleRouter);
APP.use(imageRouter);
APP.use(productRouter);
APP.use(homestyleRouter);
APP.use(avisStyleRouter);
APP.use(partnersStyleRouter);
APP.use(socialNetworkStyleRouter);
APP.use(carouselStyleRouter);
APP.use(mapSiteStyleRouter);
APP.use(shopStyleRouter);
APP.use(contactStyleRouter);
APP.use(scheduleStyleRouter);
APP.use(productListStyleRouter);
export default APP;
