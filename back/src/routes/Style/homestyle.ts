import express from 'express';
import multer from 'multer';
import Home_Style from '../../models/Style/HomeComponentStyle';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/api/homestyle', async (req, res) => {
    try {
        const homestyle = await Home_Style.find();
        res.json(homestyle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/api/homestyle', upload.single('bgImage'), async (req, res) => {
    const homeStyle = new Home_Style({
        bgImage: req.file.path,
        overlayBgColor: req.body.overlayBgColor,
        titleFontSize: req.body.titleFontSize,
        titleColor: req.body.titleColor,
        subTitleFontSize: req.body.subTitleFontSize,
        subTitleColor: req.body.subTitleColor,
    });

    try {
        const newHomeStyle = await homeStyle.save();
        res.status(201).json(newHomeStyle);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

router.put('/api/homestyle/:id', upload.single('bgImage'), async (req, res) => {
    try {
        const homeStyle = await Home_Style.findById(req.params.id);
        if (!homeStyle) {
            return res.status(404).json({ message: 'Home style not found' });
        }

        if (req.file) {
            homeStyle.bgImage = req.file.path;
        }
        homeStyle.overlayBgColor = req.body.overlayBgColor;
        homeStyle.titleFontSize = req.body.titleFontSize;
        homeStyle.titleColor = req.body.titleColor;
        homeStyle.subTitleFontSize = req.body.subTitleFontSize;
        homeStyle.subTitleColor = req.body.subTitleColor;

        await homeStyle.save();
        res.json({ message: 'Home style updated', homeStyle });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/api/homestyle/:id', async (req, res) => {
    try {
        const homeStyle = await Home_Style.findById(req.params.id);
        if (!homeStyle) {
            return res.status(404).json({ message: 'Home style not found' });
        }
        await homeStyle.deleteOne();
        res.json({ message: 'Home style deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export { router as homestyleRouter };