import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Link } from "@chakra-ui/react";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { checkIfUserIsLoggedIn } from './LoginComponent';

interface MapSiteComponentStyleProps {
    containerBgColor: string;
    containerPadding: string;
    containerMinHeight: string;
    boxMarginX: string;
    boxMarginY: string;
    boxMarginBottom: string;
    titleColor: string;
    titleFontSize: string[];
    titleMarginBottom: string;
    textColor: string;
    textFontSize: string[];
}

const defaultMapSiteComponentStyleProps: MapSiteComponentStyleProps = {
    containerBgColor: "#93441A",
    containerPadding: "50px",
    containerMinHeight: "300px",
    boxMarginX: "4",
    boxMarginY: "8",
    boxMarginBottom: "20px",
    titleColor: "white",
    titleFontSize: ["lg", "xl", "2xl"],
    titleMarginBottom: "8px",
    textColor: "white",
    textFontSize: ["xs", "sm", "md"]
};

const MapSiteComponent: React.FC = () => {
    const { t } = useTranslation();
    const isLoggedIn = checkIfUserIsLoggedIn();
    const [administratorLink, setAdministratorLink] = useState('/administrator');
    const [styleProps, setStyleProps] = useState<MapSiteComponentStyleProps>(defaultMapSiteComponentStyleProps);

    useEffect(() => {
        if (!isLoggedIn) {
            setAdministratorLink('/administrator/auth')
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const fetchStyleProps = async () => {
            try {
                const response = await axios.get('/api/mapsitestyle');
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
        <Box textAlign="center" padding={styleProps.containerPadding} bg={styleProps.containerBgColor} minHeight={styleProps.containerMinHeight}>
            <Flex justify="center" flexWrap="wrap">
                <Box flex="1 0 300px" mx={styleProps.boxMarginX} my={styleProps.boxMarginY} marginBottom={styleProps.boxMarginBottom}>
                    <Text color={styleProps.titleColor} fontSize={styleProps.titleFontSize} marginBottom={styleProps.titleMarginBottom}>
                        {'ProjectHub'}
                    </Text>
                    <Text color={styleProps.textColor} fontSize={styleProps.textFontSize}>
                        {t("subTitle")}
                    </Text>
                </Box>
                <Box flex="1 0 300px" mx={styleProps.boxMarginX} my={styleProps.boxMarginY} marginBottom={styleProps.boxMarginBottom}>
                    <Text color={styleProps.titleColor} fontSize={styleProps.titleFontSize} marginBottom={styleProps.titleMarginBottom}>
                        {t("contact")}
                    </Text>
                    <Text color={styleProps.textColor} fontSize={styleProps.textFontSize}>
                        {'2 Rue du Professeur Charles Appleton, 69007 Lyon'}
                    </Text>
                    <Text color={styleProps.textColor} fontSize={styleProps.textFontSize}>
                        {'lyon@epitech.eu'}
                    </Text>
                    <Text color={styleProps.textColor} fontSize={styleProps.textFontSize}>
                        {'04 28 29 33 25'}
                    </Text>
                </Box>
                <Box flex="1 0 300px" mx={styleProps.boxMarginX} my={styleProps.boxMarginY} marginBottom={styleProps.boxMarginBottom}>
                    <Box textAlign="center" flexDirection="column">
                        <Text color={styleProps.titleColor} fontSize={styleProps.titleFontSize} marginBottom={styleProps.titleMarginBottom}>
                            {t("usefulLinks")}
                        </Text>
                        <Link href="/#shop">
                            <Text color={styleProps.textColor} fontSize={styleProps.textFontSize}>{t("shop")}</Text>
                        </Link>
                        <Link href="/#galleries">
                            <Text color={styleProps.textColor} fontSize={styleProps.textFontSize}>{t("galleries")}</Text>
                        </Link>
                        <Link href="/#article">
                            <Text color={styleProps.textColor} fontSize={styleProps.textFontSize}>{t("Article")}</Text>
                        </Link>
                        <Link href="/#partners">
                            <Text color={styleProps.textColor} fontSize={styleProps.textFontSize}>{t("partners")}</Text>
                        </Link>
                        <Link href="/#contact">
                            <Text color={styleProps.textColor} fontSize={styleProps.textFontSize}>{t("contact")}</Text>
                        </Link>
                        <Link href={administratorLink}>
                            <Text color={styleProps.textColor} fontSize={styleProps.textFontSize}>{t("administrator")}</Text>
                        </Link>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default MapSiteComponent;
