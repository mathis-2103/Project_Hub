import React, { useState, useEffect } from 'react';
import { Box, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, VStack, Button, Text, useToast } from '@chakra-ui/react';
import InputComponent from '../../common/InputComponent';
import axios from 'axios';

interface ModalStyleProps {
    modalBgColor: string;
    headerFontSize: string;
    headerFontWeight: string;
    headerBorderColor: string;
    priceFontSize: string;
    priceFontColor: string;
    nameFontSize: string;
    nameFontColor: string;
    descriptionFontSize: string;
    descriptionFontColor: string;
    materialFontSize: string;
    materialFontColor: string;
    sizeButtonBgColor: string;
    sizeButtonBorderColor: string;
    sizeButtonTextColor: string;
    addToCartButtonColorScheme: string;
    addToCartButtonHoverBg: string;
}

const defaultModalStyleProps: ModalStyleProps = {
    modalBgColor: "#FFFFFF",
    headerFontSize: "3xl",
    headerFontWeight: "bold",
    headerBorderColor: "#E2E2E2",
    priceFontSize: "3xl",
    priceFontColor: "#FF5100",
    nameFontSize: "2xl",
    nameFontColor: "#333333",
    descriptionFontSize: "lg",
    descriptionFontColor: "#777777",
    materialFontSize: "lg",
    materialFontColor: "#555555",
    sizeButtonBgColor: "#FFFFFF",
    sizeButtonBorderColor: "#FF5100",
    sizeButtonTextColor: "#111439",
    addToCartButtonColorScheme: "teal",
    addToCartButtonHoverBg: "teal.600"
};

const ModalStyleConfig: React.FC = () => {
    const [styleProps, setStyleProps] = useState<ModalStyleProps>(defaultModalStyleProps);
    const [styleId, setStyleId] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/productliststyle');
                if (response.data) {
                    const data = response.data;
                    setStyleId(data._id);
                    setStyleProps(data);
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

    const handleChange = (property: keyof ModalStyleProps, value: string) => {
        setStyleProps({ ...styleProps, [property]: value });
    };

    const handleSaveStyle = async () => {
        try {
            let response;
            if (styleId) {
                response = await axios.put(`/api/productliststyle/${styleId}`, styleProps);
            } else {
                response = await axios.post('/api/productliststyle', styleProps);
            }

            toast({
                title: "Style sauvegardé.",
                description: "Le style du modal a été sauvegardé avec succès.",
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
        setStyleProps(defaultModalStyleProps);

        if (styleId) {
            try {
                await axios.put(`/api/productliststyle/${styleId}`, defaultModalStyleProps);

                toast({
                    title: "Style réinitialisé.",
                    description: "Le style du modal a été réinitialisé avec succès.",
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
        <Box h="90%" w="100%" p={4} bg={styleProps.modalBgColor} color="black">
            <Flex direction={{ base: 'column', md: 'row' }} w="100%" h="100%">
                <Box w={{ base: '100%', md: '30%' }} bg={'white'} p={4} borderRight={{ base: 'none', md: '1px solid' }} borderColor="gray.200" overflowY="auto">
                    <Tabs variant="soft-rounded" colorScheme="green">
                        <TabList>
                            <Tab>Styles</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <VStack spacing={4}>
                                    <InputComponent
                                        label="Couleur de fond du modal"
                                        name="modalBgColor"
                                        type="color"
                                        value={styleProps.modalBgColor}
                                        onChange={(e) => handleChange('modalBgColor', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Taille de la police de l'en-tête"
                                        name="headerFontSize"
                                        type="text"
                                        value={styleProps.headerFontSize}
                                        onChange={(e) => handleChange('headerFontSize', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Poids de la police de l'en-tête"
                                        name="headerFontWeight"
                                        type="text"
                                        value={styleProps.headerFontWeight}
                                        onChange={(e) => handleChange('headerFontWeight', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Couleur de la bordure de l'en-tête"
                                        name="headerBorderColor"
                                        type="color"
                                        value={styleProps.headerBorderColor}
                                        onChange={(e) => handleChange('headerBorderColor', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Taille de la police du prix"
                                        name="priceFontSize"
                                        type="text"
                                        value={styleProps.priceFontSize}
                                        onChange={(e) => handleChange('priceFontSize', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Couleur de la police du prix"
                                        name="priceFontColor"
                                        type="color"
                                        value={styleProps.priceFontColor}
                                        onChange={(e) => handleChange('priceFontColor', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Taille de la police du nom"
                                        name="nameFontSize"
                                        type="text"
                                        value={styleProps.nameFontSize}
                                        onChange={(e) => handleChange('nameFontSize', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Couleur de la police du nom"
                                        name="nameFontColor"
                                        type="color"
                                        value={styleProps.nameFontColor}
                                        onChange={(e) => handleChange('nameFontColor', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Taille de la police de la description"
                                        name="descriptionFontSize"
                                        type="text"
                                        value={styleProps.descriptionFontSize}
                                        onChange={(e) => handleChange('descriptionFontSize', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Couleur de la police de la description"
                                        name="descriptionFontColor"
                                        type="color"
                                        value={styleProps.descriptionFontColor}
                                        onChange={(e) => handleChange('descriptionFontColor', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Taille de la police du matériel"
                                        name="materialFontSize"
                                        type="text"
                                        value={styleProps.materialFontSize}
                                        onChange={(e) => handleChange('materialFontSize', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Couleur de la police du matériel"
                                        name="materialFontColor"
                                        type="color"
                                        value={styleProps.materialFontColor}
                                        onChange={(e) => handleChange('materialFontColor', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Couleur de fond du bouton de taille"
                                        name="sizeButtonBgColor"
                                        type="color"
                                        value={styleProps.sizeButtonBgColor}
                                        onChange={(e) => handleChange('sizeButtonBgColor', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Couleur de bordure du bouton de taille"
                                        name="sizeButtonBorderColor"
                                        type="color"
                                        value={styleProps.sizeButtonBorderColor}
                                        onChange={(e) => handleChange('sizeButtonBorderColor', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Couleur du texte du bouton de taille"
                                        name="sizeButtonTextColor"
                                        type="color"
                                        value={styleProps.sizeButtonTextColor}
                                        onChange={(e) => handleChange('sizeButtonTextColor', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Schéma de couleur du bouton Ajouter au panier"
                                        name="addToCartButtonColorScheme"
                                        type="text"
                                        value={styleProps.addToCartButtonColorScheme}
                                        onChange={(e) => handleChange('addToCartButtonColorScheme', e.target.value)}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Couleur de survol du bouton Ajouter au panier"
                                        name="addToCartButtonHoverBg"
                                        type="color"
                                        value={styleProps.addToCartButtonHoverBg}
                                        onChange={(e) => handleChange('addToCartButtonHoverBg', e.target.value)}
                                        isRequired={true}
                                    />
                                    <Button colorScheme="teal" size="lg" onClick={handleSaveStyle} width="100%" mt={4}>
                                        Sauvegarder le Style
                                    </Button>
                                    <Button colorScheme="red" size="lg" onClick={handleResetStyle} width="100%" mt={4}>
                                        Réinitialiser le Style
                                    </Button>
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>

                <Box
                    w={{ base: '100%', md: '70%' }}
                    p={4}
                    bg={styleProps.modalBgColor}
                    color={styleProps.nameFontColor}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box w="100%" p={4} borderColor={styleProps.headerBorderColor} borderWidth={1} mb={4}>
                        <Text fontSize={styleProps.headerFontSize} fontWeight={styleProps.headerFontWeight} mb={2}>
                            Modal Header
                        </Text>
                    </Box>
                    <Text fontSize={styleProps.priceFontSize} color={styleProps.priceFontColor} mb={4}>
                        $99.99
                    </Text>
                    <Text fontSize={styleProps.nameFontSize} color={styleProps.nameFontColor} mb={4}>
                        Product Name
                    </Text>
                    <Text fontSize={styleProps.descriptionFontSize} color={styleProps.descriptionFontColor} mb={4}>
                        This is a product description. It provides details about the product.
                    </Text>
                    <Text fontSize={styleProps.materialFontSize} color={styleProps.materialFontColor} mb={4}>
                        Material: 100% Cotton
                    </Text>
                    <Button colorScheme={styleProps.addToCartButtonColorScheme} _hover={{ bg: styleProps.addToCartButtonHoverBg }}>
                        Add to Cart
                    </Button>
                </Box>
            </Flex>
        </Box>
    );
};

export default ModalStyleConfig;
