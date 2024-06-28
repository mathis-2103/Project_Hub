import React, { useState, useEffect } from 'react';
import { Box, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Button, useToast, FormControl, FormLabel, Text, Input } from "@chakra-ui/react";
import { ChromePicker } from 'react-color';
import InputComponent from '../../common/InputComponent';
import axios from 'axios';

const fontSizes = ["12px", "16px", "20px", "24px"];

const defaultAvisComponentStyleProps = {
    bgColor: "#EEE6D8",
    cardBgColor: "#FFFFFF",
    cardHoverBgColor: "#F8F8F9",
    cardTextColor: "#111439",
    cardHoverTransform: "scale(1.05)",
    cardBoxShadow: "md",
    cardHoverBoxShadow: "lg",
    titleFontSize: "md",
    titleFontColor: "#111439",
    reviewFontSize: "lg",
    reviewFontColor: "#555555",
    authorFontSize: "md",
    authorFontColor: "#555555",
    starMarginRight: "4px",
    transition: "all 0.3s"
};

const AvisComponentForm: React.FC = () => {
    const [bgColor, setBgColor] = useState(defaultAvisComponentStyleProps.bgColor);
    const [cardBgColor, setCardBgColor] = useState(defaultAvisComponentStyleProps.cardBgColor);
    const [cardHoverBgColor, setCardHoverBgColor] = useState(defaultAvisComponentStyleProps.cardHoverBgColor);
    const [cardTextColor, setCardTextColor] = useState(defaultAvisComponentStyleProps.cardTextColor);
    const [cardHoverTransform, setCardHoverTransform] = useState(defaultAvisComponentStyleProps.cardHoverTransform);
    const [cardBoxShadow, setCardBoxShadow] = useState(defaultAvisComponentStyleProps.cardBoxShadow);
    const [cardHoverBoxShadow, setCardHoverBoxShadow] = useState(defaultAvisComponentStyleProps.cardHoverBoxShadow);
    const [titleFontSize, setTitleFontSize] = useState(defaultAvisComponentStyleProps.titleFontSize);
    const [titleFontColor, setTitleFontColor] = useState(defaultAvisComponentStyleProps.titleFontColor);
    const [reviewFontSize, setReviewFontSize] = useState(defaultAvisComponentStyleProps.reviewFontSize);
    const [reviewFontColor, setReviewFontColor] = useState(defaultAvisComponentStyleProps.reviewFontColor);
    const [authorFontSize, setAuthorFontSize] = useState(defaultAvisComponentStyleProps.authorFontSize);
    const [authorFontColor, setAuthorFontColor] = useState(defaultAvisComponentStyleProps.authorFontColor);
    const [starMarginRight, setStarMarginRight] = useState(defaultAvisComponentStyleProps.starMarginRight);
    const [transition, setTransition] = useState(defaultAvisComponentStyleProps.transition);
    const [avisStyleId, setAvisStyleId] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/avisstyle');
                if (response.data) {
                    const data = response.data;
                    setAvisStyleId(data._id);
                    setBgColor(data.bgColor);
                    setCardBgColor(data.cardBgColor);
                    setCardHoverBgColor(data.cardHoverBgColor);
                    setCardTextColor(data.cardTextColor);
                    setCardHoverTransform(data.cardHoverTransform);
                    setCardBoxShadow(data.cardBoxShadow);
                    setCardHoverBoxShadow(data.cardHoverBoxShadow);
                    setTitleFontSize(data.titleFontSize);
                    setTitleFontColor(data.titleFontColor);
                    setReviewFontSize(data.reviewFontSize);
                    setReviewFontColor(data.reviewFontColor);
                    setAuthorFontSize(data.authorFontSize);
                    setAuthorFontColor(data.authorFontColor);
                    setStarMarginRight(data.starMarginRight);
                    setTransition(data.transition);
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
            case 'bgColor':
                setBgColor(value);
                break;
            case 'cardBgColor':
                setCardBgColor(value);
                break;
            case 'cardHoverBgColor':
                setCardHoverBgColor(value);
                break;
            case 'cardTextColor':
                setCardTextColor(value);
                break;
            case 'cardHoverTransform':
                setCardHoverTransform(value);
                break;
            case 'cardBoxShadow':
                setCardBoxShadow(value);
                break;
            case 'cardHoverBoxShadow':
                setCardHoverBoxShadow(value);
                break;
            case 'titleFontSize':
                setTitleFontSize(value);
                break;
            case 'titleFontColor':
                setTitleFontColor(value);
                break;
            case 'reviewFontSize':
                setReviewFontSize(value);
                break;
            case 'reviewFontColor':
                setReviewFontColor(value);
                break;
            case 'authorFontSize':
                setAuthorFontSize(value);
                break;
            case 'authorFontColor':
                setAuthorFontColor(value);
                break;
            case 'starMarginRight':
                setStarMarginRight(value);
                break;
            case 'transition':
                setTransition(value);
                break;
            default:
                break;
        }
    };

    const handleSaveAvisStyle = async () => {
        const formData = {
            bgColor,
            cardBgColor,
            cardHoverBgColor,
            cardTextColor,
            cardHoverTransform,
            cardBoxShadow,
            cardHoverBoxShadow,
            titleFontSize,
            titleFontColor,
            reviewFontSize,
            reviewFontColor,
            authorFontSize,
            authorFontColor,
            starMarginRight,
            transition,
        };

        try {
            let response;
            if (avisStyleId) {
                response = await axios.put(`/api/avisstyle/${avisStyleId}`, formData);
            } else {
                response = await axios.post('/api/avisstyle', formData);
            }

            toast({
                title: "Style sauvegardé.",
                description: "Le style du composant Avis a été sauvegardé avec succès.",
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
        setBgColor(defaultAvisComponentStyleProps.bgColor);
        setCardBgColor(defaultAvisComponentStyleProps.cardBgColor);
        setCardHoverBgColor(defaultAvisComponentStyleProps.cardHoverBgColor);
        setCardTextColor(defaultAvisComponentStyleProps.cardTextColor);
        setCardHoverTransform(defaultAvisComponentStyleProps.cardHoverTransform);
        setCardBoxShadow(defaultAvisComponentStyleProps.cardBoxShadow);
        setCardHoverBoxShadow(defaultAvisComponentStyleProps.cardHoverBoxShadow);
        setTitleFontSize(defaultAvisComponentStyleProps.titleFontSize);
        setTitleFontColor(defaultAvisComponentStyleProps.titleFontColor);
        setReviewFontSize(defaultAvisComponentStyleProps.reviewFontSize);
        setReviewFontColor(defaultAvisComponentStyleProps.reviewFontColor);
        setAuthorFontSize(defaultAvisComponentStyleProps.authorFontSize);
        setAuthorFontColor(defaultAvisComponentStyleProps.authorFontColor);
        setStarMarginRight(defaultAvisComponentStyleProps.starMarginRight);
        setTransition(defaultAvisComponentStyleProps.transition);

        if (avisStyleId) {
            try {
                await axios.put(`/api/avisstyle/${avisStyleId}`, defaultAvisComponentStyleProps);

                toast({
                    title: "Style réinitialisé.",
                    description: "Le style du composant Avis a été réinitialisé avec succès.",
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
                                <FormControl id="bgColor" isRequired mb={4}>
                                    <FormLabel>Couleur de fond</FormLabel>
                                    <ChromePicker
                                        color={bgColor}
                                        onChangeComplete={(color) => setBgColor(color.hex)}
                                    />
                                </FormControl>
                                <FormControl id="cardBgColor" isRequired mb={4}>
                                    <FormLabel>Couleur de fond de la carte</FormLabel>
                                    <ChromePicker
                                        color={cardBgColor}
                                        onChangeComplete={(color) => setCardBgColor(color.hex)}
                                    />
                                </FormControl>
                                <FormControl id="cardHoverBgColor" isRequired mb={4}>
                                    <FormLabel>Couleur de fond de la carte au survol</FormLabel>
                                    <ChromePicker
                                        color={cardHoverBgColor}
                                        onChangeComplete={(color) => setCardHoverBgColor(color.hex)}
                                    />
                                </FormControl>
                                <InputComponent
                                    label="Couleur du texte de la carte"
                                    name="cardTextColor"
                                    type="color"
                                    value={cardTextColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Transformation de la carte au survol"
                                    name="cardHoverTransform"
                                    type="text"
                                    value={cardHoverTransform}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Ombre de la carte"
                                    name="cardBoxShadow"
                                    type="text"
                                    value={cardBoxShadow}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Ombre de la carte au survol"
                                    name="cardHoverBoxShadow"
                                    type="text"
                                    value={cardHoverBoxShadow}
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
                                <InputComponent
                                    label="Taille de la police de l'avis"
                                    name="reviewFontSize"
                                    type="select"
                                    value={reviewFontSize}
                                    onChange={handleChange}
                                    selectOptions={fontSizes.map(size => ({ value: size, label: size }))}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur de la police de l'avis"
                                    name="reviewFontColor"
                                    type="color"
                                    value={reviewFontColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Taille de la police de l'auteur"
                                    name="authorFontSize"
                                    type="select"
                                    value={authorFontSize}
                                    onChange={handleChange}
                                    selectOptions={fontSizes.map(size => ({ value: size, label: size }))}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Couleur de la police de l'auteur"
                                    name="authorFontColor"
                                    type="color"
                                    value={authorFontColor}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Marge droite de l'étoile"
                                    name="starMarginRight"
                                    type="text"
                                    value={starMarginRight}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <InputComponent
                                    label="Transition"
                                    name="transition"
                                    type="text"
                                    value={transition}
                                    onChange={handleChange}
                                    isRequired={true}
                                />
                                <Button colorScheme="teal" size="lg" onClick={handleSaveAvisStyle} width="100%" mt={4}>
                                    Sauvegarder le Style
                                </Button>
                                <Button colorScheme="red" size="lg" onClick={handleResetStyle} width="100%" mt={4}>
                                    Réinitialiser le Style
                                </Button>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
                <Box h="98%" w={{ base: '100%', md: '70%' }} p={4} bg={bgColor}>
                    <Box
                        bg={cardBgColor}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="md"
                        transition={transition}
                        _hover={{
                            bg: cardHoverBgColor,
                            transform: cardHoverTransform,
                            boxShadow: cardHoverBoxShadow,
                        }}
                    >
                        <Text fontSize={titleFontSize} color={titleFontColor} mb={4}>
                            Titre rendu
                        </Text>
                        <Text fontSize={reviewFontSize} color={reviewFontColor}>
                            Avis rendu
                        </Text>
                        <Text fontSize={authorFontSize} color={authorFontColor} mt={2}>
                            Auteur rendu
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default AvisComponentForm;
