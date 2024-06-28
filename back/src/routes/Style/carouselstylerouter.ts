import express from 'express';
import CarouselComponentStyle from '../../models/Style/CarouselComponentStyle';

const router = express.Router();

const defaultCarouselComponentStyle = {
    containerBgColor: '#ffffff',
    textColor: '#000000',
    titleFontSize: '24px',
    titleFontColor: '#000000',
    carouselBgColor: '#ffffff',
    arrowColor: '#000000',
    imageBorderColor: '#cccccc',
    imageBorderWidth: '2px',
    imageMaxHeight: '400px'
};

router.get('/api/carouselstyle', async (req, res) => {
    try {
        let carouselComponentStyle = await CarouselComponentStyle.findOne();
        if (!carouselComponentStyle) {
            carouselComponentStyle = new CarouselComponentStyle(defaultCarouselComponentStyle);
            await carouselComponentStyle.save();
        }
        res.json(carouselComponentStyle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/api/carouselstyle', async (req, res) => {
    const carouselComponentStyle = new CarouselComponentStyle(req.body);

    try {
        const newCarouselComponentStyle = await carouselComponentStyle.save();
        res.status(201).json(newCarouselComponentStyle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/api/carouselstyle/:id', async (req, res) => {
    try {
        const carouselComponentStyle = await CarouselComponentStyle.findById(req.params.id);
        if (!carouselComponentStyle) {
            return res.status(404).json({ message: 'Carousel Component Style not found' });
        }

        Object.assign(carouselComponentStyle, req.body);

        await carouselComponentStyle.save();
        res.json({ message: 'Carousel Component Style updated', carouselComponentStyle });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/api/carouselstyle/:id', async (req, res) => {
    try {
        const carouselComponentStyle = await CarouselComponentStyle.findById(req.params.id);
        if (!carouselComponentStyle) {
            return res.status(404).json({ message: 'Carousel Component Style not found' });
        }
        await carouselComponentStyle.deleteOne();
        res.json({ message: 'Carousel Component Style deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export { router as carouselStyleRouter };
