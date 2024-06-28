import express from 'express';
import ProductListStyle from '../../models/Style/ProductListStyle';

const router = express.Router();

const defaultProductListStyle = {
    modalBgColor: "#FFFFFF",
    modalHeaderBorderColor: "gray.200",
    modalBodyBgColor: "gray.100",
    modalContentBorderColor: "#e2e8f0",
    textColors: {
        name: "gray.800",
        description: "gray.600",
        price: "teal.500",
        category: "gray.500",
        material: "gray.800",
    },
    buttonStyles: {
        sizeButtonBgColor: "gray.200",
        sizeButtonBorderColor: "gray.300",
        sizeButtonTextColor: "gray.800",
        sizeButtonHoverBg: "gray.50",
        addToCartButtonColorScheme: "teal",
        addToCartButtonHoverBg: "teal.600",
    },
    textSize: {
        header: "2xl",
        price: "2xl",
        name: "lg",
        description: "md",
        material: "md",
    },
    modalBoxSize: "400px",
    bgColor: "#FFFFFF",
    priceColor: "gray.500",
    borderColor: "#E2E2E2",
    boxSize: "250px",
    fontSizeName: "xl",
    fontSizePrice: "md",
    sizeTitre: "6xl",
    textColor: "#000000",
    dividerColor: "#FF5100",
    sizeText: "2xl",
    secondaryTextColor: "#555555",
};

router.get('/api/productliststyle', async (req, res) => {
    try {
        let productListStyle = await ProductListStyle.findOne();
        if (!productListStyle) {
            productListStyle = new ProductListStyle(defaultProductListStyle);
            await productListStyle.save();
        }
        res.json(productListStyle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/api/productliststyle', async (req, res) => {
    const productListStyle = new ProductListStyle(req.body);

    try {
        const newProductListStyle = await productListStyle.save();
        res.status(201).json(newProductListStyle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/api/productliststyle/:id', async (req, res) => {
    try {
        const productListStyle = await ProductListStyle.findById(req.params.id);
        if (!productListStyle) {
            return res.status(404).json({ message: 'Product List Style not found' });
        }

        Object.assign(productListStyle, req.body);

        await productListStyle.save();
        res.json({ message: 'Product List Style updated', productListStyle });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/api/productliststyle/:id', async (req, res) => {
    try {
        const productListStyle = await ProductListStyle.findById(req.params.id);
        if (!productListStyle) {
            return res.status(404).json({ message: 'Product List Style not found' });
        }
        await productListStyle.deleteOne();
        res.json({ message: 'Product List Style deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export { router as productListStyleRouter };
