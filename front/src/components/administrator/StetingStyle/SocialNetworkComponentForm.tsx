import React, { useState, useEffect } from 'react';
import { Box, Flex, Tabs, TabList, TabPanels, Tab, Text, TabPanel, Button, useToast, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { ChromePicker } from 'react-color';
import axios from 'axios';

const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "32px"];

const defaultSocialNetworksComponentStyleProps = {
    containerBgColor: "#DAAB3A",
    titleFontSize: { base: '4xl', md: '6xl' },
    titleColor: 'black',
    iconSize: { base: '150px', md: '200px' },
    iconMarginBottom: '1rem',
    iconMarginRight: '0rem',
    iconTransition: 'transform 0.3s',
    textFontSize: { base: '2xl', md: '3xl' },
    textColor: 'black',
    linkMarginLeft: { base: '0', md: '6rem' },
};

const SocialNetworkStyleForm: React.FC = () => {
    const [name, setName] = useState('default');
    const [containerBgColor, setContainerBgColor] = useState(defaultSocialNetworksComponentStyleProps.containerBgColor);
    const [titleFontSizeBase, setTitleFontSizeBase] = useState(defaultSocialNetworksComponentStyleProps.titleFontSize.base);
    const [titleFontSizeMd, setTitleFontSizeMd] = useState(defaultSocialNetworksComponentStyleProps.titleFontSize.md);
    const [titleColor, setTitleColor] = useState(defaultSocialNetworksComponentStyleProps.titleColor);
    const [iconSizeBase, setIconSizeBase] = useState(defaultSocialNetworksComponentStyleProps.iconSize.base);
    const [iconSizeMd, setIconSizeMd] = useState(defaultSocialNetworksComponentStyleProps.iconSize.md);
    const [iconMarginBottom, setIconMarginBottom] = useState(defaultSocialNetworksComponentStyleProps.iconMarginBottom);
    const [iconMarginRight, setIconMarginRight] = useState(defaultSocialNetworksComponentStyleProps.iconMarginRight);
    const [iconTransition, setIconTransition] = useState(defaultSocialNetworksComponentStyleProps.iconTransition);
    const [textFontSizeBase, setTextFontSizeBase] = useState(defaultSocialNetworksComponentStyleProps.textFontSize.base);
    const [textFontSizeMd, setTextFontSizeMd] = useState(defaultSocialNetworksComponentStyleProps.textFontSize.md);
    const [textColor, setTextColor] = useState(defaultSocialNetworksComponentStyleProps.textColor);
    const [linkMarginLeftBase, setLinkMarginLeftBase] = useState(defaultSocialNetworksComponentStyleProps.linkMarginLeft.base);
    const [linkMarginLeftMd, setLinkMarginLeftMd] = useState(defaultSocialNetworksComponentStyleProps.linkMarginLeft.md);
    const [icons, setIcons] = useState(['facebook', 'twitter', 'linkedin']);
    const [styleId, setStyleId] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/socialnetworkstyle');
                if (response.data) {
                    const data = response.data;
                    setStyleId(data._id);
                    setName(data.name);
                    setContainerBgColor(data.containerBgColor);
                    setTitleFontSizeBase(data.titleFontSize.base);
                    setTitleFontSizeMd(data.titleFontSize.md);
                    setTitleColor(data.titleColor);
                    setIconSizeBase(data.iconSize.base);
                    setIconSizeMd(data.iconSize.md);
                    setIconMarginBottom(data.iconMarginBottom);
                    setIconMarginRight(data.iconMarginRight);
                    setIconTransition(data.iconTransition);
                    setTextFontSizeBase(data.textFontSize.base);
                    setTextFontSizeMd(data.textFontSize.md);
                    setTextColor(data.textColor);
                    setLinkMarginLeftBase(data.linkMarginLeft.base);
                    setLinkMarginLeftMd(data.linkMarginLeft.md);
                    setIcons(data.icons);
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
            name,
            containerBgColor,
            titleFontSize: { base: titleFontSizeBase, md: titleFontSizeMd },
            titleColor,
            iconSize: { base: iconSizeBase, md: iconSizeMd },
            iconMarginBottom,
            iconMarginRight,
            iconTransition,
            textFontSize: { base: textFontSizeBase, md: textFontSizeMd },
            textColor,
            linkMarginLeft: { base: linkMarginLeftBase, md: linkMarginLeftMd },
            icons,
        };

        try {
            let response;
            if (styleId) {
                response = await axios.put(`/api/socialnetworkstyle/${styleId}`, formData);
            } else {
                response = await axios.post('/api/socialnetworkstyle', formData);
            }

            toast({
                title: "Style sauvegardé.",
                description: "Le style des réseaux sociaux a été sauvegardé avec succès.",
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
        setContainerBgColor(defaultSocialNetworksComponentStyleProps.containerBgColor);
        setTitleFontSizeBase(defaultSocialNetworksComponentStyleProps.titleFontSize.base);
        setTitleFontSizeMd(defaultSocialNetworksComponentStyleProps.titleFontSize.md);
        setTitleColor(defaultSocialNetworksComponentStyleProps.titleColor);
        setIconSizeBase(defaultSocialNetworksComponentStyleProps.iconSize.base);
        setIconSizeMd(defaultSocialNetworksComponentStyleProps.iconSize.md);
        setIconMarginBottom(defaultSocialNetworksComponentStyleProps.iconMarginBottom);
        setIconMarginRight(defaultSocialNetworksComponentStyleProps.iconMarginRight);
        setIconTransition(defaultSocialNetworksComponentStyleProps.iconTransition);
        setTextFontSizeBase(defaultSocialNetworksComponentStyleProps.textFontSize.base);
        setTextFontSizeMd(defaultSocialNetworksComponentStyleProps.textFontSize.md);
        setTextColor(defaultSocialNetworksComponentStyleProps.textColor);
        setLinkMarginLeftBase(defaultSocialNetworksComponentStyleProps.linkMarginLeft.base);
        setLinkMarginLeftMd(defaultSocialNetworksComponentStyleProps.linkMarginLeft.md);
        setIcons(['facebook', 'twitter', 'linkedin']);

        if (styleId) {
            try {
                await axios.put(`/api/socialnetworkstyle/${styleId}`, defaultSocialNetworksComponentStyleProps);

                toast({
                    title: "Style réinitialisé.",
                    description: "Le style des réseaux sociaux a été réinitialisé avec succès.",
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
                                <FormControl id="titleColor" isRequired mb={4}>
                                    <FormLabel>Couleur de la police du titre</FormLabel>
                                    <ChromePicker
                                        color={titleColor}
                                        onChangeComplete={(color) => setTitleColor(color.hex)}
                                    />
                                </FormControl>
                                <FormControl id="iconSizeBase" isRequired mb={4}>
                                    <FormLabel>Taille des icônes (base)</FormLabel>
                                    <Select value={iconSizeBase} onChange={(e) => setIconSizeBase(e.target.value)}>
                                        {fontSizes.map(size => <option key={size} value={size}>{size}</option>)}
                                    </Select>
                                </FormControl>
                                <FormControl id="iconSizeMd" isRequired mb={4}>
                                    <FormLabel>Taille des icônes (md)</FormLabel>
                                    <Select value={iconSizeMd} onChange={(e) => setIconSizeMd(e.target.value)}>
                                        {fontSizes.map(size => <option key={size} value={size}>{size}</option>)}
                                    </Select>
                                </FormControl>
                                <FormControl id="iconMarginBottom" isRequired mb={4}>
                                    <FormLabel>Marge inférieure des icônes</FormLabel>
                                    <Input type="text" value={iconMarginBottom} onChange={(e) => setIconMarginBottom(e.target.value)} />
                                </FormControl>
                                <FormControl id="iconMarginRight" isRequired mb={4}>
                                    <FormLabel>Marge droite des icônes</FormLabel>
                                    <Input type="text" value={iconMarginRight} onChange={(e) => setIconMarginRight(e.target.value)} />
                                </FormControl>
                                <FormControl id="iconTransition" isRequired mb={4}>
                                    <FormLabel>Transition des icônes</FormLabel>
                                    <Input type="text" value={iconTransition} onChange={(e) => setIconTransition(e.target.value)} />
                                </FormControl>
                                <FormControl id="textFontSizeBase" isRequired mb={4}>
                                    <FormLabel>Taille de la police du texte (base)</FormLabel>
                                    <Select value={textFontSizeBase} onChange={(e) => setTextFontSizeBase(e.target.value)}>
                                        {fontSizes.map(size => <option key={size} value={size}>{size}</option>)}
                                    </Select>
                                </FormControl>
                                <FormControl id="textFontSizeMd" isRequired mb={4}>
                                    <FormLabel>Taille de la police du texte (md)</FormLabel>
                                    <Select value={textFontSizeMd} onChange={(e) => setTextFontSizeMd(e.target.value)}>
                                        {fontSizes.map(size => <option key={size} value={size}>{size}</option>)}
                                    </Select>
                                </FormControl>
                                <FormControl id="textColor" isRequired mb={4}>
                                    <FormLabel>Couleur de la police du texte</FormLabel>
                                    <ChromePicker
                                        color={textColor}
                                        onChangeComplete={(color) => setTextColor(color.hex)}
                                    />
                                </FormControl>
                                <FormControl id="linkMarginLeftBase" isRequired mb={4}>
                                    <FormLabel>Marge gauche des liens (base)</FormLabel>
                                    <Input type="text" value={linkMarginLeftBase} onChange={(e) => setLinkMarginLeftBase(e.target.value)} />
                                </FormControl>
                                <FormControl id="linkMarginLeftMd" isRequired mb={4}>
                                    <FormLabel>Marge gauche des liens (md)</FormLabel>
                                    <Input type="text" value={linkMarginLeftMd} onChange={(e) => setLinkMarginLeftMd(e.target.value)} />
                                </FormControl>
                                <FormControl id="icons" isRequired mb={4}>
                                    <FormLabel>Icônes</FormLabel>
                                    <Input type="text" value={icons.join(', ')} onChange={(e) => setIcons(e.target.value.split(', '))} />
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
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="md"
                        transition={iconTransition}
                        _hover={{
                            transform: `scale(1.1)`,
                        }}
                    >
                        <Text fontSize={titleFontSizeBase} color={titleColor} mb={4}>
                            Titre de démonstration
                        </Text>
                        <Flex>
                            {icons.map((icon, index) => (
                                <Box
                                    key={index}
                                    as="span"
                                    fontSize={iconSizeBase}
                                    color={titleColor}
                                    mb={iconMarginBottom}
                                    mr={iconMarginRight}
                                    transition={iconTransition}
                                >
                                    {icon}
                                </Box>
                            ))}
                        </Flex>
                        <Text fontSize={textFontSizeBase} color={textColor} mt={2}>
                            Texte de démonstration
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default SocialNetworkStyleForm;
