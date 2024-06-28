import React, { useEffect, useState } from "react";
import { Box, Text, useColorModeValue, Center } from "@chakra-ui/react";
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface ShopComponentStyleProps {
    containerBgColor: string;
    textColor: string;
    titleFontSize: { base: string, md: string };
    containerPaddingY: number;
    containerPaddingX: number;
    titleMarginY: number;
    iframeWidth: string;
    iframeHeight: string;
    iframeBorder: string;
}

const defaultShopComponentStyleProps: ShopComponentStyleProps = {
    containerBgColor: "#B67332",
    textColor: "black",
    titleFontSize: { base: "4xl", md: "6xl" },
    containerPaddingY: 8,
    containerPaddingX: 4,
    titleMarginY: 4,
    iframeWidth: "100%",
    iframeHeight: "450px",
    iframeBorder: "0"
};

const ShopComponent: React.FC = () => {
    const { t } = useTranslation();
    const [styleProps, setStyleProps] = useState<ShopComponentStyleProps>(defaultShopComponentStyleProps);

    useEffect(() => {
        const fetchStyleProps = async () => {
            try {
                const response = await axios.get('/api/shopstyle');
                if (response.data) {
                    setStyleProps(response.data);
                }
            } catch (error) {
                console.error('Erreur lors du chargement du style :', error);
            }
        };

        fetchStyleProps();
    }, []);

    return (
        <Box id='shop' textAlign="center" bg={useColorModeValue(styleProps.containerBgColor, "#BABABA")} py={styleProps.containerPaddingY} px={styleProps.containerPaddingX}>
            <Text fontSize={styleProps.titleFontSize} my={styleProps.titleMarginY} color={useColorModeValue(styleProps.textColor, "white")}>
                {t('shop')}
            </Text>
            <Center>
                <Box width="90%">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2762.524836187835!2d4.834267315686239!3d45.747925879105474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4eaed7b7f8c03%3A0x8cf5d632d9b2b09e!2s2%20Rue%20du%20Professeur%20Charles%20Appleton%2C%2069007%20Lyon%2C%20France!5e0!3m2!1sen!2sfr!4v1697373671097!5m2!1sen!2sfr"
                        width={styleProps.iframeWidth}
                        height={styleProps.iframeHeight}
                        loading="lazy"
                        title="Shop Location"
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{ border: styleProps.iframeBorder }}
                    ></iframe>
                </Box>
            </Center>
        </Box>
    );
};

export default ShopComponent;
