import React from "react";
import {
    Box,
    Flex,
    useBreakpointValue,
    useColorModeValue,
} from "@chakra-ui/react";
import HomeButtonComponent from "./HomeButtonComponent";
import LanguageSelectorComponent from "./LanguageSelectorComponent";
import LinksNavComponent from "./LinksNavComponent";
import AchatComponent from "./AchatComponent";

const NavBarComponent: React.FC = () => {
    const isSmallScreen = useBreakpointValue({ base: true, md: false });

    return (
        <Box
            bg={useColorModeValue("rgba(229,231,230, 0.7)", "rgba(0, 0, 0, 0.7)")}
            px={8}
            position="fixed"
            width="100%"
            zIndex={9999}
            id="Home"
        >
            {isSmallScreen ? (
                <Flex
                    h={16}
                    margin="auto"
                    width={"100%"}
                    alignItems="center"
                    justifyContent="center"
                    direction={"row"}
                >
                    <LinksNavComponent />
                    <HomeButtonComponent />
                    <LanguageSelectorComponent />
                    <AchatComponent/>
                </Flex>
            ) : (
                <Flex
                    h={16}
                    width={"100%"}
                    alignItems="center"
                    justifyContent="space-between"
                    direction={"row"}
                >
                    <Box display={"flex"}>
                        <HomeButtonComponent />
                        <LinksNavComponent />
                    </Box>
                    <Flex alignItems="center">
                        <LanguageSelectorComponent />
                        <AchatComponent />
                    </Flex>
                </Flex>
            )}
        </Box>
    );
};

export default NavBarComponent;
