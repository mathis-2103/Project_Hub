import express from 'express';
import ScheduleComponentStyle from '../../models/Style/ScheduleComponentStyle';

const router = express.Router();

const defaultScheduleComponentStyle = {
    containerBgColor: '#EEE6D8',
    textColor: 'black',
    hoverTextColor: 'black',
    tableBgColor: '#D3D3D3',
    tableBorderColor: 'black',
    tableBoxShadow: 'md',
    closedTextColor: 'red.500',
    titleFontSize: { base: '4xl', md: '6xl' },
    titleHoverScale: 'scale(1.1)',
    titleAfterHeight: '1px',
    titleAfterBgColor: 'black'
};

router.get('/api/schedulestyle', async (req, res) => {
    try {
        let scheduleComponentStyle = await ScheduleComponentStyle.findOne();
        if (!scheduleComponentStyle) {
            scheduleComponentStyle = new ScheduleComponentStyle(defaultScheduleComponentStyle);
            await scheduleComponentStyle.save();
        }
        res.json(scheduleComponentStyle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/api/schedulestyle', async (req, res) => {
    const scheduleComponentStyle = new ScheduleComponentStyle(req.body);

    try {
        const newScheduleComponentStyle = await scheduleComponentStyle.save();
        res.status(201).json(newScheduleComponentStyle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/api/schedulestyle/:id', async (req, res) => {
    try {
        const scheduleComponentStyle = await ScheduleComponentStyle.findById(req.params.id);
        if (!scheduleComponentStyle) {
            return res.status(404).json({ message: 'Schedule Component Style not found' });
        }

        Object.assign(scheduleComponentStyle, req.body);

        await scheduleComponentStyle.save();
        res.json({ message: 'Schedule Component Style updated', scheduleComponentStyle });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/api/schedulestyle/:id', async (req, res) => {
    try {
        const scheduleComponentStyle = await ScheduleComponentStyle.findById(req.params.id);
        if (!scheduleComponentStyle) {
            return res.status(404).json({ message: 'Schedule Component Style not found' });
        }
        await scheduleComponentStyle.deleteOne();
        res.json({ message: 'Schedule Component Style deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export { router as scheduleStyleRouter };
