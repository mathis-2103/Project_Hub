import React, { useState } from 'react';
import { Box, Flex, useColorModeValue, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import CategoryManager from './CategoryManager';
import TitleManager from './TitleManager';
import ProductManager from './ProductManager';
import ProductList from "./ProductList";
import Factureclient from "./Factureclient";

const AdminDashboard: React.FC = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
    };

    return (
        <Box bg={useColorModeValue("#EEE6D8", "#BABABA")} p={5} minH="100vh">
            <Flex justify="center" mb={8}>
                <Text fontSize="4xl" fontWeight="bold">Admin Dashboard</Text>
            </Flex>
            <Tabs index={tabIndex} onChange={handleTabsChange} variant="soft-rounded" align="center">
                <TabList mb={5} overflowX="auto">
                    <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Gérer les Catégories</Tab>
                    <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Gérer les Titres</Tab>
                    <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Ajouter un Produit</Tab>
                    <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Gérer les Produits</Tab>
                    <Tab _selected={{ bg: "#DAAB3A", color: "white" }}>Facture Client</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" height="70vh">
                            <CategoryManager />
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" height="70vh">
                            <TitleManager />
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" height="70vh">
                            <ProductManager/>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" height="70vh">
                            <ProductList/>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction="column" align="center" justify="center" height="70vh">
                            <Factureclient/>
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default AdminDashboard;
