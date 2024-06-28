import React, { useState, useEffect } from 'react';
import { Box, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Button, useToast, FormControl, FormLabel, Text, Input } from "@chakra-ui/react";
import { ChromePicker } from 'react-color';
import InputComponent from '../../common/InputComponent';
import axios from 'axios';
import { getAuthorizedHeader } from "../../../common/auth";

const fontSizes = ["12px", "16px", "20px", "24px"];

const defaultPartnersComponentStyleProps = {
    containerBgColor: "#DAAB3A",
    containerPaddingY: 8,
    titleFontSize: '4xl',
    titleColor: 'black',
    gridSpacing: 8,
    imageMaxHeight: "100px",
    imageBoxSize: "150px",
    imageBorderRadius: "10px",
    hoverScale: 'scale(1.1)',
};

const PartnersComponentForm: React.FC = () => {
    const [containerBgColor, setContainerBgColor] = useState(defaultPartnersComponentStyleProps.containerBgColor);
    const [containerPaddingY, setContainerPaddingY] = useState(defaultPartnersComponentStyleProps.containerPaddingY);
    const [titleFontSize, setTitleFontSize] = useState(defaultPartnersComponentStyleProps.titleFontSize);
    const [titleColor, setTitleColor] = useState(defaultPartnersComponentStyleProps.titleColor);
    const [gridSpacing, setGridSpacing] = useState(defaultPartnersComponentStyleProps.gridSpacing);
    const [imageMaxHeight, setImageMaxHeight] = useState(defaultPartnersComponentStyleProps.imageMaxHeight);
    const [imageBoxSize, setImageBoxSize] = useState(defaultPartnersComponentStyleProps.imageBoxSize);
    const [imageBorderRadius, setImageBorderRadius] = useState(defaultPartnersComponentStyleProps.imageBorderRadius);
    const [hoverScale, setHoverScale] = useState(defaultPartnersComponentStyleProps.hoverScale);
    const [partnersStyleId, setPartnersStyleId] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/partnersStyle');
                if (response.data) {
                    const data = response.data;
                    setPartnersStyleId(data._id);
                    setContainerBgColor(data.containerBgColor);
                    setContainerPaddingY(data.containerPaddingY);
                    setTitleFontSize(data.titleFontSize);
                    setTitleColor(data.titleColor);
                    setGridSpacing(data.gridSpacing);
                    setImageMaxHeight(data.imageMaxHeight);
                    setImageBoxSize(data.imageBoxSize);
                    setImageBorderRadius(data.imageBorderRadius);
                    setHoverScale(data.hoverScale);
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        switch (name) {
            case 'containerBgColor':
                setContainerBgColor(value);
                break;
            case 'containerPaddingY':
                setContainerPaddingY(Number(value));
                break;
            case 'titleFontSize':
                setTitleFontSize(value);
                break;
            case 'titleColor':
                setTitleColor(value);
                break;
            case 'gridSpacing':
                setGridSpacing(Number(value));
                break;
            case 'imageMaxHeight':
                setImageMaxHeight(value);
                break;
            case 'imageBoxSize':
                setImageBoxSize(value);
                break;
            case 'imageBorderRadius':
                setImageBorderRadius(value);
                break;
            case 'hoverScale':
                setHoverScale(value);
                break;
            default:
                break;
        }
    };

    const handleSavePartnersStyle = async () => {
        const formData = {
            containerBgColor,
            containerPaddingY,
            titleFontSize,
            titleColor,
            gridSpacing,
            imageMaxHeight,
            imageBoxSize,
            imageBorderRadius,
            hoverScale,
        };

        try {
            let response;
            if (partnersStyleId) {
                response = await axios.put(`/api/partnersStyle/${partnersStyleId}`, formData, { headers: getAuthorizedHeader() });
            } else {
                response = await axios.post('/api/partnersStyle', formData, { headers: getAuthorizedHeader() });
            }

            toast({
                title: "Style sauvegardé.",
                description: "Le style du composant Partners a été sauvegardé avec succès.",
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
        setContainerBgColor(defaultPartnersComponentStyleProps.containerBgColor);
        setContainerPaddingY(defaultPartnersComponentStyleProps.containerPaddingY);
        setTitleFontSize(defaultPartnersComponentStyleProps.titleFontSize);
        setTitleColor(defaultPartnersComponentStyleProps.titleColor);
        setGridSpacing(defaultPartnersComponentStyleProps.gridSpacing);
        setImageMaxHeight(defaultPartnersComponentStyleProps.imageMaxHeight);
        setImageBoxSize(defaultPartnersComponentStyleProps.imageBoxSize);
        setImageBorderRadius(defaultPartnersComponentStyleProps.imageBorderRadius);
        setHoverScale(defaultPartnersComponentStyleProps.hoverScale);

        if (partnersStyleId) {
            try {
                await axios.put(`/api/partnersStyle/${partnersStyleId}`, defaultPartnersComponentStyleProps, { headers: getAuthorizedHeader() });

                toast({
                    title: "Style réinitialisé.",
                    description: "Le style du composant Partners a été réinitialisé avec succès.",
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
                                <InputComponent
                                    label="Padding Y du conteneur"
                                    name="containerPaddingY"
                                    type="number"
                                    value={containerPaddingY.toString()}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Taille de la police du titre"
                                    name="titleFontSize"
                                    type="select"
                                    value={titleFontSize}
                                    onChange={handleChange}
                                    selectOptions={fontSizes.map(size => ({ value: size, label: size }))}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur de la police du titre"
                                    name="titleColor"
                                    type="color"
                                    value={titleColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Espacement de la grille"
                                    name="gridSpacing"
                                    type="number"
                                    value={gridSpacing.toString()}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Hauteur maximale de l'image"
                                    name="imageMaxHeight"
                                    type="text"
                                    value={imageMaxHeight}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Taille de la boîte de l'image"
                                    name="imageBoxSize"
                                    type="text"
                                    value={imageBoxSize}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Rayon de la bordure de l'image"
                                    name="imageBorderRadius"
                                    type="text"
                                    value={imageBorderRadius}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Échelle au survol"
                                    name="hoverScale"
                                    type="text"
                                    value={hoverScale}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <Button colorScheme="teal" size="lg" onClick={handleSavePartnersStyle} width="100%" mt={4}>
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
                        bg={containerBgColor}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="md"
                        p={containerPaddingY}
                        transition={hoverScale}
                    >
                        <Text fontSize={titleFontSize} color={titleColor} mb={4}>
                            Titre rendu
                        </Text>
                        <Box display="grid" gridTemplateColumns={`repeat(auto-fit, minmax(${imageBoxSize}, 1fr))`} gap={gridSpacing}>
                            <Box
                                bg="gray.200"
                                height={imageMaxHeight}
                                width={imageBoxSize}
                                borderRadius={imageBorderRadius}
                                transition="transform 0.3s"
                                _hover={{ transform: hoverScale }}
                            >
                                <Text align="center">Image 1</Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default PartnersComponentForm;
