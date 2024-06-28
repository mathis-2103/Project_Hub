import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Spinner, Divider } from "@chakra-ui/react";
import axios from 'axios';
import ProductList from "./ProductList";
import {useTranslation} from "react-i18next";

interface Category {
    _id: string;
    name: string;
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
    priceColor: string;
    borderColor: string;
    boxSize: string;
    fontSizeName: string;
    fontSizePrice: string;
    sizeTitre: string;
    textColor: string;
    dividerColor: string;
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
    priceColor: "gray.500",
    borderColor: "#E2E2E2",
    boxSize: "250px",
    fontSizeName: "xl",
    fontSizePrice: "md",
    sizeTitre: "6xl",
    textColor: "#000000",
    dividerColor: "#B67332",
    sizeText: "2xl",
    secondaryTextColor: "#555555"
};

const ArticleList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const {t} = useTranslation();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch categories");
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <Text color="red.500">{error}</Text>;
    }

    return (
        <Flex direction="column" justify="center" p={5}>
            <Box paddingTop={"100px"} minHeight={window.innerHeight - 300}>
                <Flex justify="center" mb={10} position="relative">
                    <Text
                        fontSize={defaultProductListStyleProps.sizeTitre}
                        color={defaultProductListStyleProps.textColor}
                        fontWeight="normal"
                        position="relative"
                        _before={{
                            content: '""',
                            position: "absolute",
                            width: "0%",
                            height: "4px",
                            bottom: "-10px",
                            left: "0%",
                            backgroundColor: defaultProductListStyleProps.dividerColor,
                            transition: "width 0.3s ease",
                        }}
                        _after={{
                            content: '""',
                            position: "absolute",
                            width: "0%",
                            height: "4px",
                            bottom: "-10px",
                            right: "0%",
                            backgroundColor: defaultProductListStyleProps.dividerColor,
                            transition: "width 0.3s ease",
                        }}
                        _hover={{
                            _before: {
                                width: "51%",
                            },
                            _after: {
                                width: "50%",
                            },
                        }}
                    >
                        {t("Article")}
                    </Text>
                </Flex>
                {categories.map(category => (
                    <Box key={category._id} mb={12} px={{ base: 4, md: 8 }}>
                        <Text
                            transition="transform 0.2s"
                            _hover={{ transform: 'scale(1.03)' }}
                            fontSize={{ base: defaultProductListStyleProps.sizeText, md: '2xl' }}
                            color={defaultProductListStyleProps.secondaryTextColor}
                            textAlign="left"
                            mb={4}
                            fontWeight="medium"
                            borderLeft="4px solid"
                            borderColor={defaultProductListStyleProps.dividerColor}
                            pl={3}
                        >
                            {category.name}
                        </Text>
                        <Divider borderColor={defaultProductListStyleProps.dividerColor} />
                        <ProductList
                            category={category.name}
                            styleProps={defaultProductListStyleProps}
                        />
                    </Box>
                ))}
            </Box>
        </Flex>
    );
};

export default ArticleList;
