import React, { useState, useEffect } from 'react';
import { Box, Flex, Tabs, TabList, Text, TabPanels, Tab, TabPanel, Button, useToast, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { ChromePicker } from 'react-color';
import axios from 'axios';

const defaultShopComponentStyleProps = {
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

const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "32px"];

const ShopComponentStyleForm: React.FC = () => {
    const [containerBgColor, setContainerBgColor] = useState(defaultShopComponentStyleProps.containerBgColor);
    const [textColor, setTextColor] = useState(defaultShopComponentStyleProps.textColor);
    const [titleFontSizeBase, setTitleFontSizeBase] = useState(defaultShopComponentStyleProps.titleFontSize.base);
    const [titleFontSizeMd, setTitleFontSizeMd] = useState(defaultShopComponentStyleProps.titleFontSize.md);
    const [containerPaddingY, setContainerPaddingY] = useState(defaultShopComponentStyleProps.containerPaddingY);
    const [containerPaddingX, setContainerPaddingX] = useState(defaultShopComponentStyleProps.containerPaddingX);
    const [titleMarginY, setTitleMarginY] = useState(defaultShopComponentStyleProps.titleMarginY);
    const [iframeWidth, setIframeWidth] = useState(defaultShopComponentStyleProps.iframeWidth);
    const [iframeHeight, setIframeHeight] = useState(defaultShopComponentStyleProps.iframeHeight);
    const [iframeBorder, setIframeBorder] = useState(defaultShopComponentStyleProps.iframeBorder);
    const [styleId, setStyleId] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/shopstyle');
                if (response.data) {
                    const data = response.data;
                    setStyleId(data._id);
                    setContainerBgColor(data.containerBgColor);
                    setTextColor(data.textColor);
                    setTitleFontSizeBase(data.titleFontSize.base);
                    setTitleFontSizeMd(data.titleFontSize.md);
                    setContainerPaddingY(data.containerPaddingY);
                    setContainerPaddingX(data.containerPaddingX);
                    setTitleMarginY(data.titleMarginY);
                    setIframeWidth(data.iframeWidth);
                    setIframeHeight(data.iframeHeight);
                    setIframeBorder(data.iframeBorder);
                }
            } catch (error) {
                toast({
                    title: "Erreur",
                    description: "Erreur lors de la récupération des données du style.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        fetchData();
    }, [toast]);

    const handleSaveStyle = async () => {
        const formData = {
            containerBgColor,
            textColor,
            titleFontSize: { base: titleFontSizeBase, md: titleFontSizeMd },
            containerPaddingY,
            containerPaddingX,
            titleMarginY,
            iframeWidth,
            iframeHeight,
            iframeBorder,
        };

        try {
            let response;
            if (styleId) {
                response = await axios.put(`/api/shopstyle/${styleId}`, formData);
            } else {
                response = await axios.post('/api/shopstyle', formData);
            }

            toast({
                title: "Style sauvegardé.",
                description: "Le style du composant Shop a été sauvegardé avec succès.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Erreur lors de la sauvegarde du style.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleResetStyle = async () => {
        setContainerBgColor(defaultShopComponentStyleProps.containerBgColor);
        setTextColor(defaultShopComponentStyleProps.textColor);
        setTitleFontSizeBase(defaultShopComponentStyleProps.titleFontSize.base);
        setTitleFontSizeMd(defaultShopComponentStyleProps.titleFontSize.md);
        setContainerPaddingY(defaultShopComponentStyleProps.containerPaddingY);
        setContainerPaddingX(defaultShopComponentStyleProps.containerPaddingX);
        setTitleMarginY(defaultShopComponentStyleProps.titleMarginY);
        setIframeWidth(defaultShopComponentStyleProps.iframeWidth);
        setIframeHeight(defaultShopComponentStyleProps.iframeHeight);
        setIframeBorder(defaultShopComponentStyleProps.iframeBorder);

        if (styleId) {
            try {
                await axios.put(`/api/shopstyle/${styleId}`, defaultShopComponentStyleProps);

                toast({
                    title: "Style réinitialisé.",
                    description: "Le style du composant Shop a été réinitialisé avec succès.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } catch (error) {
                toast({
                    title: "Erreur",
                    description: "Erreur lors de la réinitialisation du style.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <Box h="90%" w="100%" p={4} bg="white" color="black" boxShadow="md" borderRadius="md">
            <Flex direction={{ base: 'column', md: 'row' }} w="100%" h="100%">
                <Box bg="white" w={{ base: '100%', md: '30%' }} p={4} borderRight={{ base: 'none', md: '1px solid' }} borderColor="gray.200" overflowY="auto">
                    <Tabs variant="soft-rounded" colorScheme="green">
                        <TabList>
                            <Tab>Styles</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <FormControl id="containerBgColor" isRequired mb={4}>
                                    <FormLabel>Couleur de fond du conteneur</FormLabel>
                                    <ChromePicker
                                        color={containerBgColor}
                                        onChangeComplete={(color) => setContainerBgColor(color.hex)}
                                    />
                                </FormControl>
                                <FormControl id="textColor" isRequired mb={4}>
                                    <FormLabel>Couleur du texte</FormLabel>
                                    <ChromePicker
                                        color={textColor}
                                        onChangeComplete={(color) => setTextColor(color.hex)}
                                    />
                                </FormControl>
                                <FormControl id="titleFontSizeBase" isRequired mb={4}>
                                    <FormLabel>Taille de la police du titre (base)</FormLabel>
                                    <Select value={titleFontSizeBase} onChange={(e) => setTitleFontSizeBase(e.target.value)}>
                                        {fontSizes.map(size => <option key={size} value={size}>{size}</option>)}
                                    </Select>
                                </FormControl>
                                <FormControl id="titleFontSizeMd" isRequired mb={4}>
                                    <FormLabel>Taille de la police du titre (md)</FormLabel>
                                    <Select value={titleFontSizeMd} onChange={(e) => setTitleFontSizeMd(e.target.value)}>
                                        {fontSizes.map(size => <option key={size} value={size}>{size}</option>)}
                                    </Select>
                                </FormControl>
                                <FormControl id="containerPaddingY" isRequired mb={4}>
                                    <FormLabel>Padding vertical du conteneur</FormLabel>
                                    <Input type="number" value={containerPaddingY} onChange={(e) => setContainerPaddingY(parseInt(e.target.value))} />
                                </FormControl>
                                <FormControl id="containerPaddingX" isRequired mb={4}>
                                    <FormLabel>Padding horizontal du conteneur</FormLabel>
                                    <Input type="number" value={containerPaddingX} onChange={(e) => setContainerPaddingX(parseInt(e.target.value))} />
                                </FormControl>
                                <FormControl id="titleMarginY" isRequired mb={4}>
                                    <FormLabel>Marge verticale du titre</FormLabel>
                                    <Input type="number" value={titleMarginY} onChange={(e) => setTitleMarginY(parseInt(e.target.value))} />
                                </FormControl>
                                <FormControl id="iframeWidth" isRequired mb={4}>
                                    <FormLabel>Largeur de l'iframe</FormLabel>
                                    <Input type="text" value={iframeWidth} onChange={(e) => setIframeWidth(e.target.value)} />
                                </FormControl>
                                <FormControl id="iframeHeight" isRequired mb={4}>
                                    <FormLabel>Hauteur de l'iframe</FormLabel>
                                    <Input type="text" value={iframeHeight} onChange={(e) => setIframeHeight(e.target.value)} />
                                </FormControl>
                                <FormControl id="iframeBorder" isRequired mb={4}>
                                    <FormLabel>Bordure de l'iframe</FormLabel>
                                    <Input type="text" value={iframeBorder} onChange={(e) => setIframeBorder(e.target.value)} />
                                </FormControl>
                                <Button colorScheme="teal" size="lg" onClick={handleSaveStyle} width="100%" mt={4}>
                                    Sauvegarder le Style
                                </Button>
                                <Button colorScheme="red" size="lg" onClick={handleResetStyle} width="100%" mt={4}>
                                    Réinitialiser le Style
                                </Button>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
                <Box h="98%" w={{ base: '100%', md: '70%' }} p={4} bg={containerBgColor} py={containerPaddingY} px={containerPaddingX}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        border="1px solid"
                        borderColor={iframeBorder}
                        py={titleMarginY}
                    >
                        <Text fontSize={titleFontSizeBase} color={textColor} mb={titleMarginY}>
                            Titre de démonstration
                        </Text>
                        <iframe
                            src="https://www.example.com"
                            width={iframeWidth}
                            height={iframeHeight}
                            style={{ border: iframeBorder }}
                        ></iframe>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default ShopComponentStyleForm;
