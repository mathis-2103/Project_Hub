import express from 'express';
import MapSiteComponentStyle from '../../models/Style/MapSiteStyleRouter';

const router = express.Router();

const defaultMapSiteComponentStyle = {
    containerBgColor: '#ffffff',
    containerPadding: '16px',
    containerMinHeight: '300px',
    boxMarginX: '8px',
    boxMarginY: '8px',
    boxMarginBottom: '16px',
    titleColor: '#000000',
    titleFontSize: ['16px', '20px'],
    titleMarginBottom: '8px',
    textColor: '#000000',
    textFontSize: ['14px', '16px']
};

router.get('/api/mapsitestyle', async (req, res) => {
    try {
        let mapSiteComponentStyle = await MapSiteComponentStyle.findOne();
        if (!mapSiteComponentStyle) {
            mapSiteComponentStyle = new MapSiteComponentStyle(defaultMapSiteComponentStyle);
            await mapSiteComponentStyle.save();
        }
        res.json(mapSiteComponentStyle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/api/mapsitestyle', async (req, res) => {
    const mapSiteComponentStyle = new MapSiteComponentStyle(req.body);

    try {
        const newMapSiteComponentStyle = await mapSiteComponentStyle.save();
        res.status(201).json(newMapSiteComponentStyle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/api/mapsitestyle/:id', async (req, res) => {
    try {
        const mapSiteComponentStyle = await MapSiteComponentStyle.findById(req.params.id);
        if (!mapSiteComponentStyle) {
            return res.status(404).json({ message: 'Map Site Component Style not found' });
        }

        Object.assign(mapSiteComponentStyle, req.body);

        await mapSiteComponentStyle.save();
        res.json({ message: 'Map Site Component Style updated', mapSiteComponentStyle });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/api/mapsitestyle/:id', async (req, res) => {
    try {
        const mapSiteComponentStyle = await MapSiteComponentStyle.findById(req.params.id);
        if (!mapSiteComponentStyle) {
            return res.status(404).json({ message: 'Map Site Component Style not found' });
        }
        await mapSiteComponentStyle.deleteOne();
        res.json({ message: 'Map Site Component Style deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export { router as mapSiteStyleRouter };
