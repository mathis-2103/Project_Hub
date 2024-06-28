import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import axios from 'axios';
import ProductComponent from "./ProductComponent";

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    material: string;
    images: string[];
    category: string;
    title: string;
    stockBySize: Record<string, number>;
}

interface Title {
    _id: string;
    name: string;
    category: {
        _id: string;
        name: string;
    };
}

interface ProductListProps {
    category: string;
    styleProps: ProductListStyleProps;
}

interface ProductListStyleProps {
    modalBgColor: string;
    modalHeaderBorderColor: string;
    modalBodyBgColor: string;
    modalContentBorderColor: string;
    textColors: {
        name: string;
        description: string;
        price: string;
        category: string;
        material: string;
    };
    buttonStyles: {
        sizeButtonBgColor: string;
        sizeButtonBorderColor: string;
        sizeButtonTextColor: string;
        sizeButtonHoverBg: string;
        addToCartButtonColorScheme: string;
        addToCartButtonHoverBg: string;
    };
    textSize: {
        header: string;
        price: string;
        name: string;
        description: string;
        material: string;
    };
    modalBoxSize: string;
    bgColor: string;
    textColor: string;
    priceColor: string;
    borderColor: string;
    boxSize: string;
    fontSizeName: string;
    fontSizePrice: string;
    sizeText: string;
    secondaryTextColor: string;
}

const defaultProductListStyleProps: ProductListStyleProps = {
    modalBgColor: "#FFFFFF",
    modalHeaderBorderColor: "gray.200",
    modalBodyBgColor: "gray.100",
    modalContentBorderColor: "#e2e8f0",
    textColors: {
        name: "gray.800",
        description: "gray.600",
        price: "teal.500",
        category: "gray.500",
        material: "gray.800"
    },
    buttonStyles: {
        sizeButtonBgColor: "gray.200",
        sizeButtonBorderColor: "gray.300",
        sizeButtonTextColor: "gray.800",
        sizeButtonHoverBg: "gray.50",
        addToCartButtonColorScheme: "teal",
        addToCartButtonHoverBg: "teal.600"
    },
    textSize: {
        header: "2xl",
        price: "2xl",
        name: "lg",
        description: "md",
        material: "md"
    },
    modalBoxSize: "400px",
    bgColor: "#FFFFFF",
    textColor: "#000000",
    priceColor: "gray.500",
    borderColor: "#E2E2E2",
    boxSize: "250px",
    fontSizeName: "xl",
    fontSizePrice: "md",
    sizeText: "2xl",
    secondaryTextColor: "#555555"
};

const ProductList: React.FC<ProductListProps> = ({ category, styleProps = defaultProductListStyleProps }) => {
    const [titles, setTitles] = useState<Title[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTitlesAndProducts = async () => {
            try {
                const [titlesResponse, productsResponse] = await Promise.all([
                    axios.get('/api/titles'),
                    axios.get('/api/products')
                ]);
                setTitles(titlesResponse.data);
                setProducts(productsResponse.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch data");
                setLoading(false);
            }
        };
        fetchTitlesAndProducts();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert status="error">
                <AlertIcon />
                {error}
            </Alert>
        );
    }

    const filteredTitles = titles.filter(title => title.category.name === category);

    return (
        <Flex direction="column" width="100%">
            {filteredTitles.map(title => {
                const titleProducts = products.filter(product => product.title === title.name);
                return (
                    <Box key={title._id} mb={8}>
                        <Text
                            transition="transform 0.2s"
                            _hover={{ transform: 'scale(1.03)' }}
                            fontSize={{ base: styleProps.sizeText, md: '2xl' }}
                            color={styleProps.secondaryTextColor}
                            textAlign="left"
                            mt={4}
                            fontWeight="medium"
                            mb={4}
                        >
                            {title.name}
                        </Text>
                        <ProductComponent products={titleProducts} />
                    </Box>
                );
            })}
        </Flex>
    );
};

export default ProductList;
