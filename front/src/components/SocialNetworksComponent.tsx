import React, { useEffect, useState } from 'react';
import { Box, Center, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import instagamme from '../assets/reseaux/instagram.png';
// @ts-ignore
import facbook from '../assets/reseaux/facebook.png';

interface SocialNetworksComponentStyleProps {
    containerBgColor: string;
    titleFontSize: { base: string, md: string };
    titleColor: string;
    iconSize: { base: string, md: string };
    iconMarginBottom: string;
    iconMarginRight: string;
    iconTransition: string;
    textFontSize: { base: string, md: string };
    textColor: string;
    linkMarginLeft: { base: string, md: string };
}

const defaultSocialNetworksComponentStyleProps: SocialNetworksComponentStyleProps = {
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

const SocialNetworksComponent: React.FC = () => {
    const { t } = useTranslation();
    const [styleProps, setStyleProps] = useState<SocialNetworksComponentStyleProps>(defaultSocialNetworksComponentStyleProps);

    useEffect(() => {
        const fetchStyleProps = async () => {
            try {
                const response = await axios.get('/api/socialnetworkstyle');
                if (response.data) {
                    setStyleProps(response.data);
                }
            } catch (error) {
                console.error('Erreur lors du chargement du style :', error);
            }
        };

        fetchStyleProps();
    }, []);

    const imageSize = useBreakpointValue({ base: styleProps.iconSize.base, md: styleProps.iconSize.md });
    const flexDirectionIcons = useBreakpointValue<React.CSSProperties['flexDirection']>({ base: 'column', md: 'row' });
    const marginLeftText = useBreakpointValue({ base: styleProps.linkMarginLeft.base, md: styleProps.linkMarginLeft.md });

    const iconStyle = {
        width: imageSize,
        height: imageSize,
        marginBottom: styleProps.iconMarginBottom,
        marginRight: styleProps.iconMarginRight,
        transition: styleProps.iconTransition,
    };

    return (
        <Box bg={styleProps.containerBgColor}>
            <Text fontSize={styleProps.titleFontSize} textAlign="center" color={styleProps.titleColor}>
                {t('reseaux')}
            </Text>
            <Center>
                <Box w="80%" margin="3%">
                    <Flex align={{ base: 'center', md: 'flex-start' }} justify="center" mt={4} flexDirection={flexDirectionIcons} marginLeft="1rem">
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <img
                                src={instagamme}
                                alt="Instagram"
                                style={{ ...iconStyle }}
                                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            />
                        </a>
                        <a href="" target="_blank" rel="noopener noreferrer" style={{ marginLeft: marginLeftText }}>
                            <img
                                src={facbook}
                                alt="Facebook"
                                style={{ ...iconStyle }}
                                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            />
                        </a>
                    </Flex>
                    <Flex align="center" justify="center" mt={4} flexDirection="column">
                        <Text fontSize={styleProps.textFontSize} textAlign="center" color={styleProps.textColor}>
                            {t('reseauxT')}
                        </Text>
                    </Flex>
                </Box>
            </Center>
        </Box>
    );
}

export default SocialNetworksComponent;
