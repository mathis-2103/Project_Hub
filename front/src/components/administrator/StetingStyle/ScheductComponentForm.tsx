import React, { useState, useEffect } from 'react';
import { Box, Input, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Button, useToast, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { ChromePicker } from 'react-color';
import InputComponent from '../../common/InputComponent';
import axios from 'axios';
import { getAuthorizedHeader } from "../../../common/auth";

const fontSizes = ["12px", "16px", "20px", "24px"];

const defaultScheduleComponentStyleProps = {
    containerBgColor: "#EEE6D8",
    textColor: "black",
    hoverTextColor: "black",
    tableBgColor: "#D3D3D3",
    tableBorderColor: "black",
    tableBoxShadow: "md",
    closedTextColor: "red.500",
    titleFontSize: { base: '4xl', md: '6xl' },
    titleHoverScale: 'scale(1.1)',
    titleAfterHeight: '1px',
    titleAfterBgColor: 'black',
};

const ScheduleComponentForm: React.FC = () => {
    const [containerBgColor, setContainerBgColor] = useState(defaultScheduleComponentStyleProps.containerBgColor);
    const [textColor, setTextColor] = useState(defaultScheduleComponentStyleProps.textColor);
    const [hoverTextColor, setHoverTextColor] = useState(defaultScheduleComponentStyleProps.hoverTextColor);
    const [tableBgColor, setTableBgColor] = useState(defaultScheduleComponentStyleProps.tableBgColor);
    const [tableBorderColor, setTableBorderColor] = useState(defaultScheduleComponentStyleProps.tableBorderColor);
    const [tableBoxShadow, setTableBoxShadow] = useState(defaultScheduleComponentStyleProps.tableBoxShadow);
    const [closedTextColor, setClosedTextColor] = useState(defaultScheduleComponentStyleProps.closedTextColor);
    const [titleFontSize, setTitleFontSize] = useState(defaultScheduleComponentStyleProps.titleFontSize);
    const [titleHoverScale, setTitleHoverScale] = useState(defaultScheduleComponentStyleProps.titleHoverScale);
    const [titleAfterHeight, setTitleAfterHeight] = useState(defaultScheduleComponentStyleProps.titleAfterHeight);
    const [titleAfterBgColor, setTitleAfterBgColor] = useState(defaultScheduleComponentStyleProps.titleAfterBgColor);
    const [scheduleStyleId, setScheduleStyleId] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/schedulestyle');
                if (response.data) {
                    const data = response.data;
                    setScheduleStyleId(data._id);
                    setContainerBgColor(data.containerBgColor);
                    setTextColor(data.textColor);
                    setHoverTextColor(data.hoverTextColor);
                    setTableBgColor(data.tableBgColor);
                    setTableBorderColor(data.tableBorderColor);
                    setTableBoxShadow(data.tableBoxShadow);
                    setClosedTextColor(data.closedTextColor);
                    setTitleFontSize(data.titleFontSize);
                    setTitleHoverScale(data.titleHoverScale);
                    setTitleAfterHeight(data.titleAfterHeight);
                    setTitleAfterBgColor(data.titleAfterBgColor);
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
        const { name, value, dataset } = event.target;
        switch (name) {
            case 'containerBgColor':
                setContainerBgColor(value);
                break;
            case 'textColor':
                setTextColor(value);
                break;
            case 'hoverTextColor':
                setHoverTextColor(value);
                break;
            case 'tableBgColor':
                setTableBgColor(value);
                break;
            case 'tableBorderColor':
                setTableBorderColor(value);
                break;
            case 'tableBoxShadow':
                setTableBoxShadow(value);
                break;
            case 'closedTextColor':
                setClosedTextColor(value);
                break;
            case 'titleFontSize':
                setTitleFontSize({ ...titleFontSize, [dataset.size as string]: value });
                break;
            case 'titleHoverScale':
                setTitleHoverScale(value);
                break;
            case 'titleAfterHeight':
                setTitleAfterHeight(value);
                break;
            case 'titleAfterBgColor':
                setTitleAfterBgColor(value);
                break;
            default:
                break;
        }
    };

    const handleSaveScheduleStyle = async () => {
        const formData = {
            containerBgColor,
            textColor,
            hoverTextColor,
            tableBgColor,
            tableBorderColor,
            tableBoxShadow,
            closedTextColor,
            titleFontSize,
            titleHoverScale,
            titleAfterHeight,
            titleAfterBgColor,
        };

        try {
            let response;
            if (scheduleStyleId) {
                response = await axios.put(`/api/schedulestyle/${scheduleStyleId}`, formData, { headers: getAuthorizedHeader() });
            } else {
                response = await axios.post('/api/schedulestyle', formData, { headers: getAuthorizedHeader() });
            }

            toast({
                title: "Style sauvegardé.",
                description: "Le style du composant Schedule a été sauvegardé avec succès.",
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

    const handleResetScheduleStyle = async () => {
        setContainerBgColor(defaultScheduleComponentStyleProps.containerBgColor);
        setTextColor(defaultScheduleComponentStyleProps.textColor);
        setHoverTextColor(defaultScheduleComponentStyleProps.hoverTextColor);
        setTableBgColor(defaultScheduleComponentStyleProps.tableBgColor);
        setTableBorderColor(defaultScheduleComponentStyleProps.tableBorderColor);
        setTableBoxShadow(defaultScheduleComponentStyleProps.tableBoxShadow);
        setClosedTextColor(defaultScheduleComponentStyleProps.closedTextColor);
        setTitleFontSize(defaultScheduleComponentStyleProps.titleFontSize);
        setTitleHoverScale(defaultScheduleComponentStyleProps.titleHoverScale);
        setTitleAfterHeight(defaultScheduleComponentStyleProps.titleAfterHeight);
        setTitleAfterBgColor(defaultScheduleComponentStyleProps.titleAfterBgColor);

        if (scheduleStyleId) {
            try {
                await axios.put(`/api/schedulestyle/${scheduleStyleId}`, defaultScheduleComponentStyleProps, { headers: getAuthorizedHeader() });

                toast({
                    title: "Style réinitialisé.",
                    description: "Le style du composant Schedule a été réinitialisé avec succès.",
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
                                    label="Couleur du texte"
                                    name="textColor"
                                    type="color"
                                    value={textColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur du texte au survol"
                                    name="hoverTextColor"
                                    type="color"
                                    value={hoverTextColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur de fond de la table"
                                    name="tableBgColor"
                                    type="color"
                                    value={tableBgColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur de la bordure de la table"
                                    name="tableBorderColor"
                                    type="color"
                                    value={tableBorderColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Ombre de la table"
                                    name="tableBoxShadow"
                                    type="text"
                                    value={tableBoxShadow}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur du texte fermé"
                                    name="closedTextColor"
                                    type="color"
                                    value={closedTextColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <FormControl id="titleFontSize" isRequired mb={4}>
                                    <FormLabel>Taille de la police du titre</FormLabel>
                                    <Flex>
                                        <Input
                                            name="titleFontSize"
                                            data-size="base"
                                            value={titleFontSize.base}
                                            onChange={handleChange}
                                            placeholder="Base"
                                            mr={2}
                                        />
                                        <Input
                                            name="titleFontSize"
                                            data-size="md"
                                            value={titleFontSize.md}
                                            onChange={handleChange}
                                            placeholder="MD"
                                        />
                                    </Flex>
                                </FormControl>
                                <InputComponent
                                    label="Échelle au survol du titre"
                                    name="titleHoverScale"
                                    type="text"
                                    value={titleHoverScale}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Hauteur de l'après titre"
                                    name="titleAfterHeight"
                                    type="text"
                                    value={titleAfterHeight}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur de l'après titre"
                                    name="titleAfterBgColor"
                                    type="color"
                                    value={titleAfterBgColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <Button colorScheme="teal" size="lg" onClick={handleSaveScheduleStyle} width="100%" mt={4}>
                                    Sauvegarder le Style
                                </Button>
                                <Button colorScheme="red" size="lg" onClick={handleResetScheduleStyle} width="100%" mt={4}>
                                    Réinitialiser le Style
                                </Button>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
                <Box h="98%" w={{ base: '100%', md: '70%' }} p={4} bg={containerBgColor}>
                    <Box
                        bg={tableBgColor}
                        p={4}
                        borderRadius="md"
                        border="1px solid"
                        borderColor={tableBorderColor}
                    >
                        <Text fontSize={titleFontSize.base} color={textColor} mb={4}>
                            Titre rendu
                        </Text>
                        <Box
                            borderWidth="1px"
                            borderRadius="xl"
                            mb={4}
                            bg={tableBgColor}
                            boxShadow={tableBoxShadow}
                            borderColor={tableBorderColor}
                        >
                            <Text color={closedTextColor}>Closed Example</Text>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default ScheduleComponentForm;
