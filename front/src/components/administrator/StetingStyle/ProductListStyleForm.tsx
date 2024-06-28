import React, { useState, useEffect } from 'react';
import { Box, Input, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Button, useToast, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { ChromePicker } from 'react-color';
import InputComponent from '../../common/InputComponent';
import axios from 'axios';
import { getAuthorizedHeader } from "../../../common/auth";

const defaultProductListStyleProps = {
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

const ProductListStyleForm: React.FC = () => {
    const [modalBgColor, setModalBgColor] = useState(defaultProductListStyleProps.modalBgColor);
    const [modalHeaderBorderColor, setModalHeaderBorderColor] = useState(defaultProductListStyleProps.modalHeaderBorderColor);
    const [modalBodyBgColor, setModalBodyBgColor] = useState(defaultProductListStyleProps.modalBodyBgColor);
    const [modalContentBorderColor, setModalContentBorderColor] = useState(defaultProductListStyleProps.modalContentBorderColor);
    const [textColors, setTextColors] = useState(defaultProductListStyleProps.textColors);
    const [buttonStyles, setButtonStyles] = useState(defaultProductListStyleProps.buttonStyles);
    const [textSize, setTextSize] = useState(defaultProductListStyleProps.textSize);
    const [modalBoxSize, setModalBoxSize] = useState(defaultProductListStyleProps.modalBoxSize);
    const [bgColor, setBgColor] = useState(defaultProductListStyleProps.bgColor);
    const [priceColor, setPriceColor] = useState(defaultProductListStyleProps.priceColor);
    const [borderColor, setBorderColor] = useState(defaultProductListStyleProps.borderColor);
    const [boxSize, setBoxSize] = useState(defaultProductListStyleProps.boxSize);
    const [fontSizeName, setFontSizeName] = useState(defaultProductListStyleProps.fontSizeName);
    const [fontSizePrice, setFontSizePrice] = useState(defaultProductListStyleProps.fontSizePrice);
    const [sizeTitre, setSizeTitre] = useState('6xl');
    const [textColor, setTextColor] = useState(defaultProductListStyleProps.textColor);
    const [dividerColor, setDividerColor] = useState('#B67332');
    const [sizeText, setSizeText] = useState(defaultProductListStyleProps.sizeText);
    const [secondaryTextColor, setSecondaryTextColor] = useState(defaultProductListStyleProps.secondaryTextColor);
    const [productListStyleId, setProductListStyleId] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/productliststyle');
                if (response.data) {
                    const data = response.data;
                    setProductListStyleId(data._id);
                    setModalBgColor(data.modalBgColor);
                    setModalHeaderBorderColor(data.modalHeaderBorderColor);
                    setModalBodyBgColor(data.modalBodyBgColor);
                    setModalContentBorderColor(data.modalContentBorderColor);
                    setTextColors(data.textColors);
                    setButtonStyles(data.buttonStyles);
                    setTextSize(data.textSize);
                    setModalBoxSize(data.modalBoxSize);
                    setBgColor(data.bgColor);
                    setPriceColor(data.priceColor);
                    setBorderColor(data.borderColor);
                    setBoxSize(data.boxSize);
                    setFontSizeName(data.fontSizeName);
                    setFontSizePrice(data.fontSizePrice);
                    setSizeTitre(data.sizeTitre);
                    setTextColor(data.textColor);
                    setDividerColor(data.dividerColor);
                    setSizeText(data.sizeText);
                    setSecondaryTextColor(data.secondaryTextColor);
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
            case 'modalBgColor':
                setModalBgColor(value);
                break;
            case 'modalHeaderBorderColor':
                setModalHeaderBorderColor(value);
                break;
            case 'modalBodyBgColor':
                setModalBodyBgColor(value);
                break;
            case 'modalContentBorderColor':
                setModalContentBorderColor(value);
                break;
            case 'textColors':
                setTextColors({ ...textColors, [dataset.field as string]: value });
                break;
            case 'buttonStyles':
                setButtonStyles({ ...buttonStyles, [dataset.field as string]: value });
                break;
            case 'textSize':
                setTextSize({ ...textSize, [dataset.field as string]: value });
                break;
            case 'modalBoxSize':
                setModalBoxSize(value);
                break;
            case 'bgColor':
                setBgColor(value);
                break;
            case 'priceColor':
                setPriceColor(value);
                break;
            case 'borderColor':
                setBorderColor(value);
                break;
            case 'boxSize':
                setBoxSize(value);
                break;
            case 'fontSizeName':
                setFontSizeName(value);
                break;
            case 'fontSizePrice':
                setFontSizePrice(value);
                break;
            case 'sizeTitre':
                setSizeTitre(value);
                break;
            case 'textColor':
                setTextColor(value);
                break;
            case 'dividerColor':
                setDividerColor(value);
                break;
            case 'sizeText':
                setSizeText(value);
                break;
            case 'secondaryTextColor':
                setSecondaryTextColor(value);
                break;
            default:
                break;
        }
    };

    const handleSaveProductListStyle = async () => {
        const formData = {
            modalBgColor,
            modalHeaderBorderColor,
            modalBodyBgColor,
            modalContentBorderColor,
            textColors,
            buttonStyles,
            textSize,
            modalBoxSize,
            bgColor,
            priceColor,
            borderColor,
            boxSize,
            fontSizeName,
            fontSizePrice,
            sizeTitre,
            textColor,
            dividerColor,
            sizeText,
            secondaryTextColor,
        };

        try {
            let response;
            if (productListStyleId) {
                response = await axios.put(`/api/productliststyle/${productListStyleId}`, formData, { headers: getAuthorizedHeader() });
            } else {
                response = await axios.post('/api/productliststyle', formData, { headers: getAuthorizedHeader() });
            }

            toast({
                title: "Style sauvegardé.",
                description: "Le style du composant Product List a été sauvegardé avec succès.",
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

    const handleResetProductListStyle = async () => {
        setModalBgColor(defaultProductListStyleProps.modalBgColor);
        setModalHeaderBorderColor(defaultProductListStyleProps.modalHeaderBorderColor);
        setModalBodyBgColor(defaultProductListStyleProps.modalBodyBgColor);
        setModalContentBorderColor(defaultProductListStyleProps.modalContentBorderColor);
        setTextColors(defaultProductListStyleProps.textColors);
        setButtonStyles(defaultProductListStyleProps.buttonStyles);
        setTextSize(defaultProductListStyleProps.textSize);
        setModalBoxSize(defaultProductListStyleProps.modalBoxSize);
        setBgColor(defaultProductListStyleProps.bgColor);
        setPriceColor(defaultProductListStyleProps.priceColor);
        setBorderColor(defaultProductListStyleProps.borderColor);
        setBoxSize(defaultProductListStyleProps.boxSize);
        setFontSizeName(defaultProductListStyleProps.fontSizeName);
        setFontSizePrice(defaultProductListStyleProps.fontSizePrice);
        setSizeTitre('6xl');
        setTextColor(defaultProductListStyleProps.textColor);
        setDividerColor('#B67332');
        setSizeText(defaultProductListStyleProps.sizeText);
        setSecondaryTextColor(defaultProductListStyleProps.secondaryTextColor);

        if (productListStyleId) {
            try {
                await axios.put(`/api/productliststyle/${productListStyleId}`, defaultProductListStyleProps, { headers: getAuthorizedHeader() });

                toast({
                    title: "Style réinitialisé.",
                    description: "Le style du composant Product List a été réinitialisé avec succès.",
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
                                <FormControl id="modalBgColor" isRequired mb={4}>
                                    <FormLabel>Couleur de fond du modal</FormLabel>
                                    <ChromePicker
                                        color={modalBgColor}
                                        onChangeComplete={(color) => setModalBgColor(color.hex)}
                                    />
                                </FormControl>
                                <InputComponent
                                    label="Couleur de bordure de l'en-tête du modal"
                                    name="modalHeaderBorderColor"
                                    type="color"
                                    value={modalHeaderBorderColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur de fond du corps du modal"
                                    name="modalBodyBgColor"
                                    type="color"
                                    value={modalBodyBgColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur de bordure du contenu du modal"
                                    name="modalContentBorderColor"
                                    type="color"
                                    value={modalContentBorderColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                {['name', 'description', 'price', 'category', 'material'].map((field) => (
                                    <InputComponent
                                        key={field}
                                        label={`Couleur du texte ${field}`}
                                        name="textColors"
                                        type="color"
                                        value={textColors[field as keyof typeof textColors]}
                                        onChange={handleChange}
                                        data-field={field}
                                        isRequired={true}
                                    />
                                ))}
                                {['sizeButtonBgColor', 'sizeButtonBorderColor', 'sizeButtonTextColor', 'sizeButtonHoverBg', 'addToCartButtonColorScheme', 'addToCartButtonHoverBg'].map((field) => (
                                    <InputComponent
                                        key={field}
                                        label={`Style du bouton ${field}`}
                                        name="buttonStyles"
                                        type="color"
                                        value={buttonStyles[field as keyof typeof buttonStyles]}
                                        onChange={handleChange}
                                        data-field={field}
                                        isRequired={true}
                                    />
                                ))}
                                {['header', 'price', 'name', 'description', 'material'].map((field) => (
                                    <InputComponent
                                        key={field}
                                        label={`Taille du texte ${field}`}
                                        name="textSize"
                                        type="text"
                                        value={textSize[field as keyof typeof textSize]}
                                        onChange={handleChange}
                                        data-field={field}
                                        isRequired={true}
                                    />
                                ))}
                                <InputComponent
                                    label="Taille de la boîte du modal"
                                    name="modalBoxSize"
                                    type="text"
                                    value={modalBoxSize}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur de fond"
                                    name="bgColor"
                                    type="color"
                                    value={bgColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur du prix"
                                    name="priceColor"
                                    type="color"
                                    value={priceColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur de la bordure"
                                    name="borderColor"
                                    type="color"
                                    value={borderColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Taille de la boîte"
                                    name="boxSize"
                                    type="text"
                                    value={boxSize}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Taille de la police du nom"
                                    name="fontSizeName"
                                    type="text"
                                    value={fontSizeName}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Taille de la police du prix"
                                    name="fontSizePrice"
                                    type="text"
                                    value={fontSizePrice}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Taille du titre"
                                    name="sizeTitre"
                                    type="text"
                                    value={sizeTitre}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur du texte"
                                    name="textColor"
                                    type="color"
                                    value={textColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur du diviseur"
                                    name="dividerColor"
                                    type="color"
                                    value={dividerColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Taille du texte"
                                    name="sizeText"
                                    type="text"
                                    value={sizeText}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur secondaire du texte"
                                    name="secondaryTextColor"
                                    type="color"
                                    value={secondaryTextColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <Button colorScheme="teal" size="lg" onClick={handleSaveProductListStyle} width="100%" mt={4}>
                                    Sauvegarder le Style
                                </Button>
                                <Button colorScheme="red" size="lg" onClick={handleResetProductListStyle} width="100%" mt={4}>
                                    Réinitialiser le Style
                                </Button>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
                <Box h="98%" w={{ base: '100%', md: '70%' }} p={4} bg={modalBgColor}>
                    <Box
                        bg={modalBgColor}
                        p={4}
                        borderRadius="md"
                        border="1px solid"
                        borderColor={modalContentBorderColor}
                    >
                        <Text fontSize={textSize.header} color={textColors.name} mb={4}>
                            Titre rendu
                        </Text>
                        <Box
                            borderWidth="1px"
                            borderRadius="xl"
                            mb={4}
                            bg={bgColor}
                            boxShadow={modalContentBorderColor}
                            borderColor={borderColor}
                        >
                            <Text color={priceColor}>Price Example</Text>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default ProductListStyleForm;
