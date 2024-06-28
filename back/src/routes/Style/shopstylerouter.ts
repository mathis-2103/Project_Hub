import express from 'express';
import ShopComponentStyle from '../../models/Style/ShopComponentStyle';

const router = express.Router();

const defaultShopComponentStyle = {
    containerBgColor: '#ffffff',
    textColor: '#000000',
    titleFontSize: { base: '16px', md: '20px' },
    containerPaddingY: 16,
    containerPaddingX: 16,
    titleMarginY: 8,
    iframeWidth: '100%',
    iframeHeight: '600px',
    iframeBorder: '1px solid #ccc'
};

router.get('/api/shopstyle', async (req, res) => {
    try {
        let shopComponentStyle = await ShopComponentStyle.findOne();
        if (!shopComponentStyle) {
            shopComponentStyle = new ShopComponentStyle(defaultShopComponentStyle);
            await shopComponentStyle.save();
        }
        res.json(shopComponentStyle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/api/shopstyle', async (req, res) => {
    const shopComponentStyle = new ShopComponentStyle(req.body);

    try {
        const newShopComponentStyle = await shopComponentStyle.save();
        res.status(201).json(newShopComponentStyle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/api/shopstyle/:id', async (req, res) => {
    try {
        const shopComponentStyle = await ShopComponentStyle.findById(req.params.id);
        if (!shopComponentStyle) {
            return res.status(404).json({ message: 'Shop Component Style not found' });
        }

        Object.assign(shopComponentStyle, req.body);

        await shopComponentStyle.save();
        res.json({ message: 'Shop Component Style updated', shopComponentStyle });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/api/shopstyle/:id', async (req, res) => {
    try {
        const shopComponentStyle = await ShopComponentStyle.findById(req.params.id);
        if (!shopComponentStyle) {
            return res.status(404).json({ message: 'Shop Component Style not found' });
        }
        await shopComponentStyle.deleteOne();
        res.json({ message: 'Shop Component Style deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export { router as shopStyleRouter };
