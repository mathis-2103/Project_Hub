import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Tabs,
    TabList,
    TabPanels,
    Text,
    Tab,
    TabPanel,
    Button,
    useToast,
    FormControl,
    FormLabel,
    Input,
    Select
} from "@chakra-ui/react";
import { ChromePicker } from 'react-color';
import axios from 'axios';

const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "32px"];

const defaultCarouselComponentStyleProps = {
    containerBgColor: "#DAAB3A",
    textColor: "white",
    titleFontSize: "4xl",
    titleFontColor: "black",
    carouselBgColor: "white",
    arrowColor: "black",
    imageBorderColor: "white",
    imageBorderWidth: "2px",
    imageMaxHeight: "400px"
};

const CarouselComponentStyleForm: React.FC = () => {
    const [containerBgColor, setContainerBgColor] = useState(defaultCarouselComponentStyleProps.containerBgColor);
    const [textColor, setTextColor] = useState(defaultCarouselComponentStyleProps.textColor);
    const [titleFontSize, setTitleFontSize] = useState(defaultCarouselComponentStyleProps.titleFontSize);
    const [titleFontColor, setTitleFontColor] = useState(defaultCarouselComponentStyleProps.titleFontColor);
    const [carouselBgColor, setCarouselBgColor] = useState(defaultCarouselComponentStyleProps.carouselBgColor);
    const [arrowColor, setArrowColor] = useState(defaultCarouselComponentStyleProps.arrowColor);
    const [imageBorderColor, setImageBorderColor] = useState(defaultCarouselComponentStyleProps.imageBorderColor);
    const [imageBorderWidth, setImageBorderWidth] = useState(defaultCarouselComponentStyleProps.imageBorderWidth);
    const [imageMaxHeight, setImageMaxHeight] = useState(defaultCarouselComponentStyleProps.imageMaxHeight);
    const [styleId, setStyleId] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/carouselstyle');
                if (response.data) {
                    const data = response.data;
                    setStyleId(data._id);
                    setContainerBgColor(data.containerBgColor);
                    setTextColor(data.textColor);
                    setTitleFontSize(data.titleFontSize);
                    setTitleFontColor(data.titleFontColor);
                    setCarouselBgColor(data.carouselBgColor);
                    setArrowColor(data.arrowColor);
                    setImageBorderColor(data.imageBorderColor);
                    setImageBorderWidth(data.imageBorderWidth);
                    setImageMaxHeight(data.imageMaxHeight);
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
            titleFontSize,
            titleFontColor,
            carouselBgColor,
            arrowColor,
            imageBorderColor,
            imageBorderWidth,
            imageMaxHeight,
        };

        try {
            let response;
            if (styleId) {
                response = await axios.put(`/api/carouselstyle/${styleId}`, formData);
            } else {
                response = await axios.post('/api/carouselstyle', formData);
            }

            toast({
                title: "Style sauvegardé.",
                description: "Le style du composant Carousel a été sauvegardé avec succès.",
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
        setContainerBgColor(defaultCarouselComponentStyleProps.containerBgColor);
        setTextColor(defaultCarouselComponentStyleProps.textColor);
        setTitleFontSize(defaultCarouselComponentStyleProps.titleFontSize);
        setTitleFontColor(defaultCarouselComponentStyleProps.titleFontColor);
        setCarouselBgColor(defaultCarouselComponentStyleProps.carouselBgColor);
        setArrowColor(defaultCarouselComponentStyleProps.arrowColor);
        setImageBorderColor(defaultCarouselComponentStyleProps.imageBorderColor);
        setImageBorderWidth(defaultCarouselComponentStyleProps.imageBorderWidth);
        setImageMaxHeight(defaultCarouselComponentStyleProps.imageMaxHeight);

        if (styleId) {
            try {
                await axios.put(`/api/carouselstyle/${styleId}`, defaultCarouselComponentStyleProps);

                toast({
                    title: "Style réinitialisé.",
                    description: "Le style du composant Carousel a été réinitialisé avec succès.",
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
                                <FormControl id="titleFontSize" isRequired mb={4}>
                                    <FormLabel>Taille de la police du titre</FormLabel>
                                    <Select value={titleFontSize} onChange={(e) => setTitleFontSize(e.target.value)}>
                                        {fontSizes.map(size => <option key={size} value={size}>{size}</option>)}
                                    </Select>
                                </FormControl>
                                <FormControl id="titleFontColor" isRequired mb={4}>
                                    <FormLabel>Couleur de la police du titre</FormLabel>
                                    <ChromePicker
                                        color={titleFontColor}
                                        onChangeComplete={(color) => setTitleFontColor(color.hex)}
                                    />
                                </FormControl>
                                <FormControl id="carouselBgColor" isRequired mb={4}>
                                    <FormLabel>Couleur de fond du carousel</FormLabel>
                                    <ChromePicker
                                        color={carouselBgColor}
                                        onChangeComplete={(color) => setCarouselBgColor(color.hex)}
                                    />
                                </FormControl>
                                <FormControl id="arrowColor" isRequired mb={4}>
                                    <FormLabel>Couleur des flèches</FormLabel>
                                    <ChromePicker
                                        color={arrowColor}
                                        onChangeComplete={(color) => setArrowColor(color.hex)}
                                    />
                                </FormControl>
                                <FormControl id="imageBorderColor" isRequired mb={4}>
                                    <FormLabel>Couleur de la bordure de l'image</FormLabel>
                                    <ChromePicker
                                        color={imageBorderColor}
                                        onChangeComplete={(color) => setImageBorderColor(color.hex)}
                                    />
                                </FormControl>
                                <FormControl id="imageBorderWidth" isRequired mb={4}>
                                    <FormLabel>Largeur de la bordure de l'image</FormLabel>
                                    <Input type="text" value={imageBorderWidth} onChange={(e) => setImageBorderWidth(e.target.value)} />
                                </FormControl>
                                <FormControl id="imageMaxHeight" isRequired mb={4}>
                                    <FormLabel>Hauteur maximale de l'image</FormLabel>
                                    <Input type="text" value={imageMaxHeight} onChange={(e) => setImageMaxHeight(e.target.value)} />
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
                <Box h="98%" w={{ base: '100%', md: '70%' }} p={4} bg={containerBgColor}>
                    <Box
                        bg={carouselBgColor}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        border="1px solid"
                        borderColor={imageBorderColor}
                        borderWidth={imageBorderWidth}
                        maxHeight={imageMaxHeight}
                    >
                        <Text fontSize={titleFontSize} color={titleFontColor} mb={4}>
                            Titre de démonstration
                        </Text>
                        <Text fontSize="16px" color={textColor} mt={2}>
                            Texte de démonstration
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default CarouselComponentStyleForm;
