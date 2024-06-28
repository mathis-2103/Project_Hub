import React, { useState, useEffect } from 'react';
import { Box, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Button, useToast, FormControl, FormLabel, Text, Input } from "@chakra-ui/react";
import { ChromePicker } from 'react-color';
import InputComponent from '../../common/InputComponent';
import axios from 'axios';
import { getAuthorizedHeader } from "../../../common/auth";

const fontSizes = ["12px", "16px", "20px", "24px"];

const defaultContactComponentStyleProps = {
    containerBgColor: "#EEE6D8",
    formBgColor: "#FFFFFF",
    inputBorderColor: "#E2E8F0",
    inputTextColor: "#111439",
    buttonBgColor: "teal",
    buttonHoverBgColor: "teal.600",
    buttonTextColor: "#FFFFFF",
    titleFontSize: "4xl",
    titleFontColor: "#111439"
};

const ContactComponentForm: React.FC = () => {
    const [containerBgColor, setContainerBgColor] = useState(defaultContactComponentStyleProps.containerBgColor);
    const [formBgColor, setFormBgColor] = useState(defaultContactComponentStyleProps.formBgColor);
    const [inputBorderColor, setInputBorderColor] = useState(defaultContactComponentStyleProps.inputBorderColor);
    const [inputTextColor, setInputTextColor] = useState(defaultContactComponentStyleProps.inputTextColor);
    const [buttonBgColor, setButtonBgColor] = useState(defaultContactComponentStyleProps.buttonBgColor);
    const [buttonHoverBgColor, setButtonHoverBgColor] = useState(defaultContactComponentStyleProps.buttonHoverBgColor);
    const [buttonTextColor, setButtonTextColor] = useState(defaultContactComponentStyleProps.buttonTextColor);
    const [titleFontSize, setTitleFontSize] = useState(defaultContactComponentStyleProps.titleFontSize);
    const [titleFontColor, setTitleFontColor] = useState(defaultContactComponentStyleProps.titleFontColor);
    const [contactStyleId, setContactStyleId] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/contactstyle');
                if (response.data) {
                    const data = response.data;
                    setContactStyleId(data._id);
                    setContainerBgColor(data.containerBgColor);
                    setFormBgColor(data.formBgColor);
                    setInputBorderColor(data.inputBorderColor);
                    setInputTextColor(data.inputTextColor);
                    setButtonBgColor(data.buttonBgColor);
                    setButtonHoverBgColor(data.buttonHoverBgColor);
                    setButtonTextColor(data.buttonTextColor);
                    setTitleFontSize(data.titleFontSize);
                    setTitleFontColor(data.titleFontColor);
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
            case 'formBgColor':
                setFormBgColor(value);
                break;
            case 'inputBorderColor':
                setInputBorderColor(value);
                break;
            case 'inputTextColor':
                setInputTextColor(value);
                break;
            case 'buttonBgColor':
                setButtonBgColor(value);
                break;
            case 'buttonHoverBgColor':
                setButtonHoverBgColor(value);
                break;
            case 'buttonTextColor':
                setButtonTextColor(value);
                break;
            case 'titleFontSize':
                setTitleFontSize(value);
                break;
            case 'titleFontColor':
                setTitleFontColor(value);
                break;
            default:
                break;
        }
    };

    const handleSaveContactStyle = async () => {
        const formData = {
            containerBgColor,
            formBgColor,
            inputBorderColor,
            inputTextColor,
            buttonBgColor,
            buttonHoverBgColor,
            buttonTextColor,
            titleFontSize,
            titleFontColor,
        };

        try {
            let response;
            if (contactStyleId) {
                response = await axios.put(`/api/contactstyle/${contactStyleId}`, formData, { headers: getAuthorizedHeader() });
            } else {
                response = await axios.post('/api/contactstyle', formData, { headers: getAuthorizedHeader() });
            }

            toast({
                title: "Style sauvegardé.",
                description: "Le style du composant Contact a été sauvegardé avec succès.",
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
        setContainerBgColor(defaultContactComponentStyleProps.containerBgColor);
        setFormBgColor(defaultContactComponentStyleProps.formBgColor);
        setInputBorderColor(defaultContactComponentStyleProps.inputBorderColor);
        setInputTextColor(defaultContactComponentStyleProps.inputTextColor);
        setButtonBgColor(defaultContactComponentStyleProps.buttonBgColor);
        setButtonHoverBgColor(defaultContactComponentStyleProps.buttonHoverBgColor);
        setButtonTextColor(defaultContactComponentStyleProps.buttonTextColor);
        setTitleFontSize(defaultContactComponentStyleProps.titleFontSize);
        setTitleFontColor(defaultContactComponentStyleProps.titleFontColor);

        if (contactStyleId) {
            try {
                await axios.put(`/api/contactstyle/${contactStyleId}`, defaultContactComponentStyleProps, { headers: getAuthorizedHeader() });

                toast({
                    title: "Style réinitialisé.",
                    description: "Le style du composant Contact a été réinitialisé avec succès.",
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
                                <FormControl id="formBgColor" isRequired mb={4}>
                                    <FormLabel>Couleur de fond du formulaire</FormLabel>
                                    <ChromePicker
                                        color={formBgColor}
                                        onChangeComplete={(color) => setFormBgColor(color.hex)}
                                    />
                                </FormControl>
                                <InputComponent
                                    label="Couleur de la bordure de l'entrée"
                                    name="inputBorderColor"
                                    type="color"
                                    value={inputBorderColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur du texte de l'entrée"
                                    name="inputTextColor"
                                    type="color"
                                    value={inputTextColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur de fond du bouton"
                                    name="buttonBgColor"
                                    type="color"
                                    value={buttonBgColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur de fond du bouton au survol"
                                    name="buttonHoverBgColor"
                                    type="color"
                                    value={buttonHoverBgColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur du texte du bouton"
                                    name="buttonTextColor"
                                    type="color"
                                    value={buttonTextColor}
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
                                    name="titleFontColor"
                                    type="color"
                                    value={titleFontColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <Button colorScheme="teal" size="lg" onClick={handleSaveContactStyle} width="100%" mt={4}>
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
                        bg={formBgColor}
                        p={4}
                        borderRadius="md"
                        border="1px solid"
                        borderColor={inputBorderColor}
                    >
                        <Text fontSize={titleFontSize} color={titleFontColor} mb={4}>
                            Titre rendu
                        </Text>
                        <Input placeholder="Texte de l'entrée" color={inputTextColor} borderColor={inputBorderColor} mb={4} />
                        <Button bg={buttonBgColor} color={buttonTextColor} _hover={{ bg: buttonHoverBgColor }}>
                            Bouton
                        </Button>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default ContactComponentForm;
