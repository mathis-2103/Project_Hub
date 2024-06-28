import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Button, useToast, FormControl, FormLabel, Input, useColorModeValue } from "@chakra-ui/react";
import { ChromePicker } from 'react-color';
import InputComponent from '../../common/InputComponent';
import axios from 'axios';

const fontSizes = ["12px", "16px", "20px", "24px"];

const defaultHomeComponentStyleProps = {
    bgImage: 'https://constructeurtravaux.fr/wp-content/uploads/2019/05/vitrine-magasin.jpg',
    overlayBgColor: 'rgba(255, 255, 255, 0.15)',
    titleFontSize: '6xl',
    titleColor: 'black',
    subTitleFontSize: 'lg',
    subTitleColor: 'black',
};

const HomeComponentForm: React.FC = () => {
    const [bgImage, setBgImage] = useState<File | null>(null);
    const [bgImageUrl, setBgImageUrl] = useState<string | null>(null);
    const [overlayBgColor, setOverlayBgColor] = useState(defaultHomeComponentStyleProps.overlayBgColor);
    const [titleFontSize, setTitleFontSize] = useState(defaultHomeComponentStyleProps.titleFontSize);
    const [titleColor, setTitleColor] = useState(defaultHomeComponentStyleProps.titleColor);
    const [subTitleFontSize, setSubTitleFontSize] = useState(defaultHomeComponentStyleProps.subTitleFontSize);
    const [subTitleColor, setSubTitleColor] = useState(defaultHomeComponentStyleProps.subTitleColor);
    const [homeStyleId, setHomeStyleId] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/homestyle');
                if (response.data.length > 0) {
                    const data = response.data[0];
                    setHomeStyleId(data._id);
                    setBgImageUrl(`/api/image/${data.bgImage}`);
                    setOverlayBgColor(data.overlayBgColor);
                    setTitleFontSize(data.titleFontSize);
                    setTitleColor(data.titleColor);
                    setSubTitleFontSize(data.subTitleFontSize);
                    setSubTitleColor(data.subTitleColor);
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setBgImage(file);
            setBgImageUrl(URL.createObjectURL(file));
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        switch (name) {
            case 'overlayBgColor':
                setOverlayBgColor(value);
                break;
            case 'titleFontSize':
                setTitleFontSize(value);
                break;
            case 'titleColor':
                setTitleColor(value);
                break;
            case 'subTitleFontSize':
                setSubTitleFontSize(value);
                break;
            case 'subTitleColor':
                setSubTitleColor(value);
                break;
            default:
                break;
        }
    };

    const handleSaveHomeStyle = async () => {
        const formData = new FormData();
        if (bgImage) {
            try {
                const uploadResponse = await axios.post('/api/image/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                formData.append('bgImage', uploadResponse.data._id);
            } catch (error) {
                toast({
                    title: "Erreur",
                    description: "Erreur lors du téléchargement de l'image.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }
        }
        formData.append('overlayBgColor', overlayBgColor);
        formData.append('titleFontSize', titleFontSize);
        formData.append('titleColor', titleColor);
        formData.append('subTitleFontSize', subTitleFontSize);
        formData.append('subTitleColor', subTitleColor);

        try {
            let response;
            if (homeStyleId) {
                response = await axios.put(`/api/homestyle/${homeStyleId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                response = await axios.post('/api/homestyle', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            toast({
                title: "Style sauvegardé.",
                description: "Le style de la page d'accueil a été sauvegardé avec succès.",
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

    const handleResetHomeStyle = () => {
        setBgImage(null);
        setBgImageUrl(defaultHomeComponentStyleProps.bgImage);
        setOverlayBgColor(defaultHomeComponentStyleProps.overlayBgColor);
        setTitleFontSize(defaultHomeComponentStyleProps.titleFontSize);
        setTitleColor(defaultHomeComponentStyleProps.titleColor);
        setSubTitleFontSize(defaultHomeComponentStyleProps.subTitleFontSize);
        setSubTitleColor(defaultHomeComponentStyleProps.subTitleColor);
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
                                <FormControl id="bgImage" isRequired>
                                    <FormLabel>Image de fond</FormLabel>
                                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                                </FormControl>
                                <FormControl id="overlayBgColor" isRequired mb={4}>
                                    <FormLabel>Couleur de l'overlay</FormLabel>
                                    <ChromePicker
                                        color={overlayBgColor}
                                        onChangeComplete={(color) => setOverlayBgColor(color.hex)}
                                    />
                                </FormControl>
                                <InputComponent
                                    label="Taille de la police du titre"
                                    name="titleFontSize"
                                    type="select"
                                    value={titleFontSize}
                                    onChange={handleChange}
                                    selectOptions={fontSizes.map(size => ({ value: size, label: size }))}
                                    isRequired={true}
                                />
                                <FormControl id="titleColor" isRequired mb={4}>
                                    <FormLabel>Couleur du titre</FormLabel>
                                    <ChromePicker
                                        color={titleColor}
                                        onChangeComplete={(color) => setTitleColor(color.hex)}
                                    />
                                </FormControl>
                                <InputComponent
                                    label="Taille de la police du sous-titre"
                                    name="subTitleFontSize"
                                    type="select"
                                    value={subTitleFontSize}
                                    onChange={handleChange}
                                    selectOptions={fontSizes.map(size => ({ value: size, label: size }))}
                                    isRequired={true}
                                />
                                <FormControl id="subTitleColor" isRequired mb={4}>
                                    <FormLabel>Couleur du sous-titre</FormLabel>
                                    <ChromePicker
                                        color={subTitleColor}
                                        onChangeComplete={(color) => setSubTitleColor(color.hex)}
                                    />
                                </FormControl>
                                <Button colorScheme="teal" size="lg" onClick={handleSaveHomeStyle} width="100%" mt={4}>
                                    Sauvegarder le Style
                                </Button>
                                <Button colorScheme="red" size="lg" onClick={handleResetHomeStyle} width="100%" mt={4}>
                                    Réinitialiser le Style
                                </Button>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
                <Box h="30%" w={{ base: '100%', md: '70%' }} p={4} bg="white">
                    <Box
                        bgImage={bgImageUrl ? `url(${bgImageUrl})` : undefined}
                        bgSize="cover"
                        bgPosition="center"
                        bgRepeat="no-repeat"
                        minHeight="60vh"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        position="relative"
                    >
                        <Box
                            bg={useColorModeValue(overlayBgColor, 'rgba(0, 0, 0, 0.3)')}
                            width={{ base: '90%', md: '70%', lg: '60%', xl: '50%' }}
                            minHeight="50vh"
                            position="relative"
                        >
                            <Text
                                fontSize={titleFontSize}
                                textAlign="center"
                                color={useColorModeValue(titleColor, 'white')}
                                position="absolute"
                                top={{ base: '20%', md: '30%', lg: '35%', xl: '30%' }}
                                left="50%"
                                transform="translate(-50%, -50%)"
                            >
                                Titre rendu
                            </Text>
                            <Text
                                fontSize={subTitleFontSize}
                                textAlign="center"
                                color={useColorModeValue(subTitleColor, 'white')}
                                position="absolute"
                                top={{ base: 'calc(20% + 40px)', md: 'calc(30% + 60px)', lg: 'calc(35% + 80px)', xl: 'calc(30% + 60px)' }}
                                left="50%"
                                transform="translateX(-50%)"
                            >
                                Sous-titre rendu
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default HomeComponentForm;
