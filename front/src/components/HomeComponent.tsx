import React, { useEffect, useState } from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';

interface HomeComponentStyleProps {
    bgImage: string;
    overlayBgColor: string;
    titleFontSize: string;
    titleColor: string;
    subTitleFontSize: string;
    subTitleColor: string;
}

const defaultHomeComponentStyleProps: HomeComponentStyleProps = {
    bgImage: 'https://constructeurtravaux.fr/wp-content/uploads/2019/05/vitrine-magasin.jpg',
    overlayBgColor: 'rgba(255, 255, 255, 0.15)',
    titleFontSize: '6xl',
    titleColor: 'black',
    subTitleFontSize: '4xl',
    subTitleColor: 'black',
};

const HomeComponent: React.FC = () => {
    const { t } = useTranslation();
    const [styleProps, setStyleProps] = useState<HomeComponentStyleProps>(defaultHomeComponentStyleProps);

    useEffect(() => {
        const fetchStyleProps = async () => {
            try {
                const response = await axios.get('/api/homestyle');
                if (response.data && response.data.length > 0) {
                    const fetchedStyleProps = response.data[0];
                    setStyleProps(fetchedStyleProps);
                }
            } catch (error) {
                console.error('Error fetching home style:', error);
            }
        };

        fetchStyleProps();
    }, []);

    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 },
    });

    return (
        <animated.div style={fadeIn}>
            <Box
                bgImage={`url(${styleProps.bgImage})`}
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
                minHeight="80vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                position="relative"
            >
                <Box
                    bg={useColorModeValue(styleProps.overlayBgColor, 'rgba(0, 0, 0, 0.3)')}
                    width={{ base: '90%', md: '70%', lg: '60%', xl: '50%' }}
                    minHeight="80vh"
                    position="relative"
                >
                    <Text
                        fontSize={styleProps.titleFontSize}
                        textAlign="center"
                        color={useColorModeValue(styleProps.titleColor, 'white')}
                        position="absolute"
                        top={{ base: '20%', md: '30%', lg: '35%', xl: '30%' }}
                        left="50%"
                        transform="translate(-50%, -50%)"
                    >
                        {t('title')}
                    </Text>
                    <Text
                        fontSize={styleProps.subTitleFontSize}
                        textAlign="center"
                        color={useColorModeValue(styleProps.subTitleColor, 'white')}
                        position="absolute"
                        top={{ base: 'calc(20% + 40px)', md: 'calc(30% + 60px)', lg: 'calc(35% + 80px)', xl: 'calc(30% + 60px)' }}
                        left="50%"
                        transform="translateX(-50%)"
                    >
                        {t('subTitle')}
                    </Text>
                </Box>
            </Box>
        </animated.div>
    );
};

export default HomeComponent;
