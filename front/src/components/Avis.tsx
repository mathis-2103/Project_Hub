import React, { useEffect, useState } from 'react';
import { Box, Center, Heading, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useTranslation } from "react-i18next";
// @ts-ignore
import etoile from '../assets/etoiles_avis/etoile.png';

interface AvisComponentStyleProps {
    bgColor: string;
    cardBgColor: string;
    cardHoverBgColor: string;
    cardTextColor: string;
    cardHoverTransform: string;
    cardBoxShadow: string;
    cardHoverBoxShadow: string;
    titleFontSize: string;
    titleFontColor: string;
    reviewFontSize: string;
    reviewFontColor: string;
    authorFontSize: string;
    authorFontColor: string;
    starMarginRight: string;
    transition: string;
}

const defaultAvisComponentStyleProps: AvisComponentStyleProps = {
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

const avis = [
    {
        id: 1,
        titre: 'Excellent service',
        commentaire: "Un grand merci à Chrystelle pour sa patiente et son professionnalisme...",
        auteur: 'Nicole',
        nombreEtoiles: 5,
    },
    {
        id: 2,
        titre: 'Très satisfait',
        commentaire: 'Julia et sa salariée sont au top et de très bons conseils...',
        auteur: 'Marion CHARE DE LAVALETTE',
        nombreEtoiles: 5,
    },
    {
        id: 3,
        titre: 'Super expérience',
        commentaire: 'Très belle boutique , agréable chaleureux pour les conseils au top...',
        auteur: 'Veronique Renard',
        nombreEtoiles: 4,
    },
];

function Etoiles({ nombreEtoiles }: { nombreEtoiles: number }) {
    const etoiles = [];
    for (let i = 0; i < nombreEtoiles; i++) {
        etoiles.push(<img key={i} src={etoile} alt="Étoile" style={{ marginRight: defaultAvisComponentStyleProps.starMarginRight }} />);
    }
    return <div style={{ display: 'flex' }}>{etoiles}</div>;
}

const AvisComponent: React.FC = () => {
    const { t } = useTranslation();
    const [hoveredAvis, setHoveredAvis] = useState<number | null>(null);
    const [styleProps, setStyleProps] = useState<AvisComponentStyleProps>(defaultAvisComponentStyleProps);

    const handleMouseEnter = (avisId: number) => {
        setHoveredAvis(avisId);
    };

    const handleMouseLeave = () => {
        setHoveredAvis(null);
    };

    useEffect(() => {
        const fetchStyleProps = async () => {
            try {
                const response = await axios.get('/api/avisstyle');
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
        <Box bg={styleProps.bgColor}>
            <Center>
                <Box maxW="xl" margin="3%">
                    <Text fontSize={{ base: '4xl', md: '6xl' }} textAlign="center" color="black">
                        {t('review')}
                    </Text>
                    <VStack spacing="4" align="stretch">
                        {avis.map((avisItem) => (
                            <Box
                                key={avisItem.id}
                                bg={styleProps.cardBgColor}
                                p="4"
                                borderRadius="md"
                                boxShadow={hoveredAvis === avisItem.id ? styleProps.cardHoverBoxShadow : styleProps.cardBoxShadow}
                                transform={hoveredAvis === avisItem.id ? styleProps.cardHoverTransform : 'scale(1)'}
                                transition={styleProps.transition}
                                onMouseEnter={() => handleMouseEnter(avisItem.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Heading as="h3" size={styleProps.titleFontSize} mb="2" color={styleProps.titleFontColor}>
                                    {avisItem.titre}
                                </Heading>
                                <Text color={styleProps.reviewFontColor} fontSize={styleProps.reviewFontSize}>{avisItem.commentaire}</Text>
                                <Etoiles nombreEtoiles={avisItem.nombreEtoiles} />
                                <Text mt="2" fontStyle="italic" textAlign="right" color={styleProps.authorFontColor} fontSize={styleProps.authorFontSize}>
                                    - {avisItem.auteur}
                                </Text>
                            </Box>
                        ))}
                    </VStack>
                </Box>
            </Center>
        </Box>
    );
}

export default AvisComponent;
