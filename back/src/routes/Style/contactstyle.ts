import express from 'express';
import ContactComponentStyle from '../../models/Style/ContactComponentStyle';

const router = express.Router();

const defaultContactComponentStyle = {
    containerBgColor: '#ffffff',
    formBgColor: '#f7f7f7',
    inputBorderColor: '#cccccc',
    inputTextColor: '#000000',
    buttonBgColor: '#007bff',
    buttonHoverBgColor: '#0056b3',
    buttonTextColor: '#ffffff',
    titleFontSize: '24px',
    titleFontColor: '#000000',
};

router.get('/api/contactstyle', async (req, res) => {
    try {
        let contactComponentStyle = await ContactComponentStyle.findOne();
        if (!contactComponentStyle) {
            contactComponentStyle = new ContactComponentStyle(defaultContactComponentStyle);
            await contactComponentStyle.save();
        }
        res.json(contactComponentStyle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/api/contactstyle', async (req, res) => {
    const contactComponentStyle = new ContactComponentStyle(req.body);

    try {
        const newContactComponentStyle = await contactComponentStyle.save();
        res.status(201).json(newContactComponentStyle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/api/contactstyle/:id', async (req, res) => {
    try {
        const contactComponentStyle = await ContactComponentStyle.findById(req.params.id);
        if (!contactComponentStyle) {
            return res.status(404).json({ message: 'Contact Component Style not found' });
        }

        Object.assign(contactComponentStyle, req.body);

        await contactComponentStyle.save();
        res.json({ message: 'Contact Component Style updated', contactComponentStyle });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/api/contactstyle/:id', async (req, res) => {
    try {
        const contactComponentStyle = await ContactComponentStyle.findById(req.params.id);
        if (!contactComponentStyle) {
            return res.status(404).json({ message: 'Contact Component Style not found' });
        }
        await contactComponentStyle.deleteOne();
        res.json({ message: 'Contact Component Style deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export { router as contactStyleRouter };
