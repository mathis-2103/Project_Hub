import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Image, Center } from '@chakra-ui/react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from 'react-spring';
// @ts-ignore
import partner1 from '../assets/logo/logo.svg';
// @ts-ignore
import partner2 from '../assets/logo/sunv.png';
// @ts-ignore
import partner3 from '../assets/logo/deelux.png';

interface PartnersComponentStyleProps {
    containerBgColor: string;
    containerPaddingY: number;
    titleFontSize: string;
    titleColor: string;
    gridSpacing: number;
    imageMaxHeight: string;
    imageBoxSize: string;
    imageBorderRadius: string;
    hoverScale: string;
}

const defaultPartnersComponentStyleProps: PartnersComponentStyleProps = {
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

const PartnersComponent: React.FC = () => {
    const { t } = useTranslation();
    const partnerImages = [partner1, partner2, partner3];
    const [isHovered, setIsHovered] = useState<React.SetStateAction<null | boolean>>(null);
    const [styleProps, setStyleProps] = useState<PartnersComponentStyleProps>(defaultPartnersComponentStyleProps);

    const fade = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 },
    });

    const scale = useSpring({
        transform: isHovered !== null ? (isHovered ? styleProps.hoverScale : 'scale(1)') : 'scale(1)',
    });

    useEffect(() => {
        const fetchStyleProps = async () => {
            try {
                const response = await axios.get('/api/partnersstyle');
                if (response.data) {
                    setStyleProps(response.data);
                }
            } catch (error) {
                console.error('Erreur lors du chargement du style :', error);
            }
        };

        fetchStyleProps();
    }, []);

    return (
        <animated.div style={fade}>
            <Box id="partners" textAlign="center" bg={styleProps.containerBgColor} py={styleProps.containerPaddingY}>
                <Text fontSize={styleProps.titleFontSize} color={styleProps.titleColor}>
                    {t('partnersTitle')}
                </Text>

                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={styleProps.gridSpacing} my={8}>
                    {partnerImages.map((image, index) => (
                        <Center key={index}>
                            <animated.div
                                onMouseOver={() => setIsHovered(true)}
                                onMouseOut={() => setIsHovered(false)}
                                style={{ ...scale, overflow: 'hidden', borderRadius: styleProps.imageBorderRadius }}
                            >
                                <Image
                                    src={image}
                                    alt={`Partner ${index + 1}`}
                                    maxHeight={styleProps.imageMaxHeight}
                                    maxWidth="100%"
                                    boxSize={styleProps.imageBoxSize}
                                    objectFit="contain"
                                />
                            </animated.div>
                        </Center>
                    ))}
                </SimpleGrid>
            </Box>
        </animated.div>
    );
};

export default PartnersComponent;
