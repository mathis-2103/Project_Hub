import React, { useState, useEffect } from 'react';
import { Box, Flex, Tabs, TabList, TabPanels, Text, Tab, TabPanel, Button, useToast, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { ChromePicker } from 'react-color';
import axios from 'axios';

const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "32px"];

const defaultMapSiteComponentStyleProps = {
    containerBgColor: "#93441A",
    containerPadding: "50px",
    containerMinHeight: "300px",
    boxMarginX: "4",
    boxMarginY: "8",
    boxMarginBottom: "20px",
    titleColor: "white",
    titleFontSize: ["lg", "xl", "2xl"],
    titleMarginBottom: "8px",
    textColor: "white",
    textFontSize: ["xs", "sm", "md"]
};

const MapSiteComponentStyleForm: React.FC = () => {
    const [containerBgColor, setContainerBgColor] = useState(defaultMapSiteComponentStyleProps.containerBgColor);
    const [containerPadding, setContainerPadding] = useState(defaultMapSiteComponentStyleProps.containerPadding);
    const [containerMinHeight, setContainerMinHeight] = useState(defaultMapSiteComponentStyleProps.containerMinHeight);
    const [boxMarginX, setBoxMarginX] = useState(defaultMapSiteComponentStyleProps.boxMarginX);
    const [boxMarginY, setBoxMarginY] = useState(defaultMapSiteComponentStyleProps.boxMarginY);
    const [boxMarginBottom, setBoxMarginBottom] = useState(defaultMapSiteComponentStyleProps.boxMarginBottom);
    const [titleColor, setTitleColor] = useState(defaultMapSiteComponentStyleProps.titleColor);
    const [titleFontSize, setTitleFontSize] = useState<string[]>(defaultMapSiteComponentStyleProps.titleFontSize);
    const [titleMarginBottom, setTitleMarginBottom] = useState(defaultMapSiteComponentStyleProps.titleMarginBottom);
    const [textColor, setTextColor] = useState(defaultMapSiteComponentStyleProps.textColor);
    const [textFontSize, setTextFontSize] = useState<string[]>(defaultMapSiteComponentStyleProps.textFontSize);
    const [styleId, setStyleId] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/mapsitestyle');
                if (response.data) {
                    const data = response.data;
                    setStyleId(data._id);
                    setContainerBgColor(data.containerBgColor);
                    setContainerPadding(data.containerPadding);
                    setContainerMinHeight(data.containerMinHeight);
                    setBoxMarginX(data.boxMarginX);
                    setBoxMarginY(data.boxMarginY);
                    setBoxMarginBottom(data.boxMarginBottom);
                    setTitleColor(data.titleColor);
                    setTitleFontSize(data.titleFontSize);
                    setTitleMarginBottom(data.titleMarginBottom);
                    setTextColor(data.textColor);
                    setTextFontSize(data.textFontSize);
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
            containerPadding,
            containerMinHeight,
            boxMarginX,
            boxMarginY,
            boxMarginBottom,
            titleColor,
            titleFontSize,
            titleMarginBottom,
            textColor,
            textFontSize,
        };

        try {
            let response;
            if (styleId) {
                response = await axios.put(`/api/mapsitestyle/${styleId}`, formData);
            } else {
                response = await axios.post('/api/mapsitestyle', formData);
            }

            toast({
                title: "Style sauvegardé.",
                description: "Le style du composant Map Site a été sauvegardé avec succès.",
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
        setContainerBgColor(defaultMapSiteComponentStyleProps.containerBgColor);
        setContainerPadding(defaultMapSiteComponentStyleProps.containerPadding);
        setContainerMinHeight(defaultMapSiteComponentStyleProps.containerMinHeight);
        setBoxMarginX(defaultMapSiteComponentStyleProps.boxMarginX);
        setBoxMarginY(defaultMapSiteComponentStyleProps.boxMarginY);
        setBoxMarginBottom(defaultMapSiteComponentStyleProps.boxMarginBottom);
        setTitleColor(defaultMapSiteComponentStyleProps.titleColor);
        setTitleFontSize(defaultMapSiteComponentStyleProps.titleFontSize);
        setTitleMarginBottom(defaultMapSiteComponentStyleProps.titleMarginBottom);
        setTextColor(defaultMapSiteComponentStyleProps.textColor);
        setTextFontSize(defaultMapSiteComponentStyleProps.textFontSize);

        if (styleId) {
            try {
                await axios.put(`/api/mapsitestyle/${styleId}`, defaultMapSiteComponentStyleProps);

                toast({
                    title: "Style réinitialisé.",
                    description: "Le style du composant Map Site a été réinitialisé avec succès.",
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
                                <FormControl id="containerPadding" isRequired mb={4}>
                                    <FormLabel>Padding du conteneur</FormLabel>
                                    <Input type="text" value={containerPadding} onChange={(e) => setContainerPadding(e.target.value)} />
                                </FormControl>
                                <FormControl id="containerMinHeight" isRequired mb={4}>
                                    <FormLabel>Hauteur minimale du conteneur</FormLabel>
                                    <Input type="text" value={containerMinHeight} onChange={(e) => setContainerMinHeight(e.target.value)} />
                                </FormControl>
                                <FormControl id="boxMarginX" isRequired mb={4}>
                                    <FormLabel>Marge horizontale des boîtes</FormLabel>
                                    <Input type="text" value={boxMarginX} onChange={(e) => setBoxMarginX(e.target.value)} />
                                </FormControl>
                                <FormControl id="boxMarginY" isRequired mb={4}>
                                    <FormLabel>Marge verticale des boîtes</FormLabel>
                                    <Input type="text" value={boxMarginY} onChange={(e) => setBoxMarginY(e.target.value)} />
                                </FormControl>
                                <FormControl id="boxMarginBottom" isRequired mb={4}>
                                    <FormLabel>Marge inférieure des boîtes</FormLabel>
                                    <Input type="text" value={boxMarginBottom} onChange={(e) => setBoxMarginBottom(e.target.value)} />
                                </FormControl>
                                <FormControl id="titleColor" isRequired mb={4}>
                                    <FormLabel>Couleur du titre</FormLabel>
                                    <ChromePicker
                                        color={titleColor}
                                        onChangeComplete={(color) => setTitleColor(color.hex)}
                                    />
                                </FormControl>
                                <FormControl id="titleFontSize" isRequired mb={4}>
                                    <FormLabel>Taille de la police du titre</FormLabel>
                                    {titleFontSize.map((size, index) => (
                                        <Select key={index} value={size} onChange={(e) => {
                                            const newFontSizes = [...titleFontSize];
                                            newFontSizes[index] = e.target.value;
                                            setTitleFontSize(newFontSizes);
                                        }}>
                                            {fontSizes.map(fs => <option key={fs} value={fs}>{fs}</option>)}
                                        </Select>
                                    ))}
                                </FormControl>
                                <FormControl id="titleMarginBottom" isRequired mb={4}>
                                    <FormLabel>Marge inférieure du titre</FormLabel>
                                    <Input type="text" value={titleMarginBottom} onChange={(e) => setTitleMarginBottom(e.target.value)} />
                                </FormControl>
                                <FormControl id="textColor" isRequired mb={4}>
                                    <FormLabel>Couleur du texte</FormLabel>
                                    <ChromePicker
                                        color={textColor}
                                        onChangeComplete={(color) => setTextColor(color.hex)}
                                    />
                                </FormControl>
                                <FormControl id="textFontSize" isRequired mb={4}>
                                    <FormLabel>Taille de la police du texte</FormLabel>
                                    {textFontSize.map((size, index) => (
                                        <Select key={index} value={size} onChange={(e) => {
                                            const newFontSizes = [...textFontSize];
                                            newFontSizes[index] = e.target.value;
                                            setTextFontSize(newFontSizes);
                                        }}>
                                            {fontSizes.map(fs => <option key={fs} value={fs}>{fs}</option>)}
                                        </Select>
                                    ))}
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
                <Box h="98%" w={{ base: '100%', md: '70%' }} p={4} bg={containerBgColor} minHeight={containerMinHeight}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        mx={boxMarginX}
                        my={boxMarginY}
                        mb={boxMarginBottom}
                    >
                        <Text fontSize={titleFontSize.join(', ')} color={titleColor} mb={titleMarginBottom}>
                            Titre de démonstration
                        </Text>
                        <Text fontSize={textFontSize.join(', ')} color={textColor} mt={2}>
                            Texte de démonstration
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default MapSiteComponentStyleForm;
