import React, {useEffect, useState} from 'react';
import {Box, Flex, Menu, MenuButton, MenuItem, MenuList, Text} from '@chakra-ui/react';
import {FiMenu} from 'react-icons/fi';
import {useTranslation} from 'react-i18next';
import {useColorModeValue} from '@chakra-ui/react';

function LinksNavComponent() {
    const {t} = useTranslation();
    const colorModeValue = useColorModeValue("black", "white");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Flex
            alignItems="center"
            justifyContent={isMobile ? "center" : "flex-start"}
            width="100%"
        >
            {isMobile ? (
                <Box>
                    <Menu>
                        <MenuButton>
                            <FiMenu size={24}/>
                        </MenuButton>
                        <MenuList alignItems="center" bg="#E5E7E6"
                                  style={{border: "1px solid black", borderRadius: "5px", padding: "8px"}}>
                            <MenuItem bg="#E5E7E6">
                                <a href="/#shop">{t("shop")}</a>
                            </MenuItem>
                            <MenuItem bg="#E5E7E6">
                                <a href="/#galleries">{t("galleries")}</a>
                            </MenuItem>
                            <MenuItem bg="#E5E7E6">
                                <a href="/#article">{t("article")}</a>
                            </MenuItem>
                            <MenuItem bg="#E5E7E6">
                                <a href="/#partners">{t("partners")}</a>
                            </MenuItem>
                            <MenuItem bg="#E5E7E6">
                                <a href="/#contact">{t("contact")}</a>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            ) : (
                <Box display={'flex'}>
                    <a href="/#shop" style={{display: "flex", alignItems: "center"}}>
                        <Text
                            color={colorModeValue}
                            fontSize="xl"
                            mx={5}
                            whiteSpace="nowrap"
                        >
                            {t("shop")}
                        </Text>
                    </a>
                    <a href="/#galleries">
                        <Text
                            color={colorModeValue}
                            fontSize="xl"
                            mx={5}
                            whiteSpace="nowrap"
                        >
                            {t("galleries")}
                        </Text>
                    </a>
                    <a href="/#article">
                        <Text
                            color={colorModeValue}
                            fontSize="xl"
                            mx={5}
                            whiteSpace="nowrap"
                        >
                            {t("Article")}
                        </Text>
                    </a>
                    <a href="/#partners">
                        <Text
                            color={colorModeValue}
                            fontSize="xl"
                            mx={5}
                            whiteSpace="nowrap"
                        >
                            {t("partners")}
                        </Text>
                    </a>
                    <a href="/#contact">
                        <Text
                            color={colorModeValue}
                            fontSize="xl"
                            mx={5}
                            whiteSpace="nowrap"
                        >
                            {t("contact")}
                        </Text>
                    </a>
                </Box>
            )}
        </Flex>
    );
}

export default LinksNavComponent;
