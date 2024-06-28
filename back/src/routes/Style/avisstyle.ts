import express from 'express';
import AvisStyle from '../../models/Style/AvisComponentStyle';

const router = express.Router();

const defaultAvisStyle = {
    bgColor: '#ffffff',
    cardBgColor: '#ffffff',
    cardHoverBgColor: '#ffffff',
    cardTextColor: '#000000',
    cardHoverTransform: 'scale(1.05)',
    cardBoxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cardHoverBoxShadow: '0 6px 8px rgba(0, 0, 0, 0.1)',
    titleFontSize: '16px',
    titleFontColor: '#000000',
    reviewFontSize: '14px',
    reviewFontColor: '#000000',
    authorFontSize: '12px',
    authorFontColor: '#000000',
    starMarginRight: '8px',
    transition: '0.3s ease-in-out',
};

router.get('/api/avisstyle', async (req, res) => {
    try {
        let avisStyle = await AvisStyle.findOne();
        if (!avisStyle) {
            avisStyle = new AvisStyle(defaultAvisStyle);
            await avisStyle.save();
        }
        res.json(avisStyle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/api/avisstyle', async (req, res) => {
    const avisStyle = new AvisStyle(req.body);

    try {
        const newAvisStyle = await avisStyle.save();
        res.status(201).json(newAvisStyle);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

router.put('/api/avisstyle/:id', async (req, res) => {
    try {
        const avisStyle = await AvisStyle.findById(req.params.id);
        if (!avisStyle) {
            return res.status(404).json({ message: 'Avis style not found' });
        }

        Object.assign(avisStyle, req.body);

        await avisStyle.save();
        res.json({ message: 'Avis style updated', avisStyle });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/api/avisstyle/:id', async (req, res) => {
    try {
        const avisStyle = await AvisStyle.findById(req.params.id);
        if (!avisStyle) {
            return res.status(404).json({ message: 'Avis style not found' });
        }
        await avisStyle.deleteOne();
        res.json({ message: 'Avis style deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export { router as avisStyleRouter };
