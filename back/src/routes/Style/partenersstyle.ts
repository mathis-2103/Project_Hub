import express from 'express';
import PartnersStyle from '../../models/Style/PartenersComponentStyle';

const router = express.Router();

const defaultPartnersStyle = {
    containerBgColor: '#ffffff',
    containerPaddingY: 20,
    titleFontSize: '24px',
    titleColor: '#000000',
    gridSpacing: 10,
    imageMaxHeight: '300px',
    imageBoxSize: '200px',
    imageBorderRadius: '10px',
    hoverScale: 'scale(1.05)',
};

router.get('/api/partnerSstyle', async (req, res) => {
    try {
        let partnersStyle = await PartnersStyle.findOne();
        if (!partnersStyle) {
            partnersStyle = new PartnersStyle(defaultPartnersStyle);
            await partnersStyle.save();
        }
        res.json(partnersStyle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/api/partnersStyle', async (req, res) => {
    const partnersStyle = new PartnersStyle(req.body);

    try {
        const newPartnersStyle = await partnersStyle.save();
        res.status(201).json(newPartnersStyle);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

router.put('/api/partnersStyle/:id', async (req, res) => {
    try {
        const partnersStyle = await PartnersStyle.findById(req.params.id);
        if (!partnersStyle) {
            return res.status(404).json({ message: 'Partners style not found' });
        }

        Object.assign(partnersStyle, req.body);

        await partnersStyle.save();
        res.json({ message: 'Partners style updated', partnersStyle });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/api/partnersStyle/:id', async (req, res) => {
    try {
        const partnersStyle = await PartnersStyle.findById(req.params.id);
        if (!partnersStyle) {
            return res.status(404).json({ message: 'Partners style not found' });
        }
        await partnersStyle.deleteOne();
        res.json({ message: 'Partners style deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export { router as partnersStyleRouter };
