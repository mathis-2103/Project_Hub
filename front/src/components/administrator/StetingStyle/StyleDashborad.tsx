import React, { useState } from 'react';
import { Box, Flex, useColorModeValue, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ModalStyleConfig from "./ModalStyleConfig";
import HomeComponentForm from "./HomeComponentForm";
import AvisComponentForm from "./AvisComponentForm";
import PartenersComponentForm from "./PartenersComponentForm";
import SocialNetworkStyleForm from "./SocialNetworkComponentForm";
import CarouselComponentStyleForm from "./CarouselComponentStyleForm";
import MapSiteComponentStyleForm from "./MapSiteComponentStyleForm";
import ShopComponentStyleForm from "./ShopComponentStyleForm";
import ContactComponentForm from "./ContactComponentForm";
import ScheduleComponentForm from "./ScheductComponentForm";
import ProductListStyleForm from "./ProductListStyleForm";


const StyleDashboard: React.FC = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
    };

    return (
        <Box bg={useColorModeValue("#EEE6D8", "#BABABA")} p={5} minH="100vh">
            <Flex justify="center" mb={8}>
                <Text fontSize="4xl" fontWeight="bold">Style Dashboard</Text>
            </Flex>
            <Tabs index={tabIndex} onChange={handleTabsChange} variant="soft-rounded" colorScheme="teal" align="center">
                {tabIndex !== 11 && (
                    <TabList mb={11} overflowX="auto">
                        <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Style les Article</Tab>
                        <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Style les Modal</Tab>
                        <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Style les Avis</Tab>
                        <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Style les Carousel</Tab>
                        <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Style les Map</Tab>
                        <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Style les Partners</Tab>
                        <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Style les Contact</Tab>
                        <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Style les shop</Tab>
                        <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Style les Social</Tab>
                        <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Style les Calendar</Tab>
                        <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Style la List des Products</Tab>
                    </TabList>
                )}
                <TabPanels >
                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" width="80%">
                            <HomeComponentForm/>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" height="70vh">
                            <ModalStyleConfig/>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" height="70vh" >
                            <AvisComponentForm/>
                        </Flex>
                    </TabPanel>

                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" height="70vh">
                            <CarouselComponentStyleForm/>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" height="70vh">
                            <MapSiteComponentStyleForm/>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" height="70vh">
                            <PartenersComponentForm/>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" height="70vh">
                            <ContactComponentForm/>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" height="70vh">
                            <ShopComponentStyleForm/>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" height="70vh">
                            <SocialNetworkStyleForm/>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" height="70vh">
                            <ScheduleComponentForm/>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" height="70vh">
                            <ProductListStyleForm/>
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default StyleDashboard;
