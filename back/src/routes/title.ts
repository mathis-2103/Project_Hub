import express from 'express';
import Title from '../models/title';
import Category from '../models/category';


const router = express.Router();

router.get('/api/titles', async (req, res) => {
    try {
        const titles = await Title.find().populate('category').populate('products');
        res.json(titles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/api/titles', async (req, res) => {
    const { name, category: categoryName } = req.body;

    try {
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(400).json({ message: 'Category not found' });
        }

        const title = new Title({
            name,
            category: category._id
        });

        const newTitle = await title.save();
        res.status(201).json(newTitle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/api/titles/:id', async (req, res) => {
    try {
        const title = await Title.findById(req.params.id);
        if (!title) {
            return res.status(404).json({ message: 'Title not found' });
        }
        await title.deleteOne();
        res.json({ message: 'Title deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
