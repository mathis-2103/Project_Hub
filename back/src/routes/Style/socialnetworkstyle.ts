import express from 'express';
import SocialNetworkStyle from '../../models/Style/SocialNetworkComponentStyle';

const router = express.Router();

const defaultSocialNetworkStyle = {
    name: 'default',
    containerBgColor: '#ffffff',
    titleFontSize: { base: '16px', md: '20px' },
    titleColor: '#000000',
    iconSize: { base: '24px', md: '32px' },
    iconMarginBottom: '8px',
    iconMarginRight: '8px',
    iconTransition: '0.3s',
    textFontSize: { base: '14px', md: '16px' },
    textColor: '#000000',
    linkMarginLeft: { base: '4px', md: '8px' },
    icons: ['facebook', 'twitter', 'linkedin']
};

router.get('/api/socialnetworkstyle', async (req, res) => {
    try {
        let socialNetworkStyle = await SocialNetworkStyle.findOne();
        if (!socialNetworkStyle) {
            socialNetworkStyle = new SocialNetworkStyle(defaultSocialNetworkStyle);
            await socialNetworkStyle.save();
        }
        res.json(socialNetworkStyle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/api/socialnetworkstyle', async (req, res) => {
    const socialNetworkStyle = new SocialNetworkStyle(req.body);

    try {
        const newSocialNetworkStyle = await socialNetworkStyle.save();
        res.status(201).json(newSocialNetworkStyle);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

router.put('/api/socialnetworkstyle/:id', async (req, res) => {
    try {
        const socialNetworkStyle = await SocialNetworkStyle.findById(req.params.id);
        if (!socialNetworkStyle) {
            return res.status(404).json({ message: 'Social Network Style not found' });
        }

        Object.assign(socialNetworkStyle, req.body);

        await socialNetworkStyle.save();
        res.json({ message: 'Social Network Style updated', socialNetworkStyle });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/api/socialnetworkstyle/:id', async (req, res) => {
    try {
        const socialNetworkStyle = await SocialNetworkStyle.findById(req.params.id);
        if (!socialNetworkStyle) {
            return res.status(404).json({ message: 'Social Network Style not found' });
        }
        await socialNetworkStyle.deleteOne();
        res.json({ message: 'Social Network Style deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export { router as socialNetworkStyleRouter };
