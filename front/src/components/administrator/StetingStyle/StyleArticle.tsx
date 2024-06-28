import React, { useState } from 'react';
import { Box, Flex, Text, Tabs, TabList, TabPanels, Tab, TabPanel, VStack, Divider } from "@chakra-ui/react";
import InputComponent from '../../common/InputComponent';

// Interface pour les propriétés de style du composant ArticleList
interface ArticleListProps {
    bgColor: string;
    textColor: string;
    dividerColor: string;
    secondaryTextColor: string;
    sizeTitre: string;
    sizeText: string;
}

const defaultArticleListStyleProps: ArticleListProps = {
    bgColor: "#F0F0F0",
    textColor: "#333333",
    dividerColor: "#E2E2E2",
    secondaryTextColor: "#777777",
    sizeTitre: "4xl",
    sizeText: "2xl"
};

const StyleArticle: React.FC = () => {
    const [styleProps, setStyleProps] = useState<ArticleListProps>(defaultArticleListStyleProps);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setStyleProps({
            ...styleProps,
            [name]: value
        });
    };

    return (
        <Box h="90%" w="100%" p={4} bg={styleProps.bgColor} boxShadow="md" borderRadius="md">
            <Flex direction={{ base: 'column', md: 'row' }} w="100%" h="100%">
                {/* Section des Inputs */}
                <Box w={{ base: '100%', md: '30%' }} bg={"white"} p={4} borderRight={{ base: 'none', md: '1px solid' }} borderColor="gray.200" overflowY="auto">
                    <Tabs variant="soft-rounded" colorScheme="green">
                        <TabList>
                            <Tab>Styles</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <VStack spacing={4}>
                                    <InputComponent
                                        label="Background Color"
                                        name="bgColor"
                                        type="color"
                                        value={styleProps.bgColor}
                                        onChange={handleInputChange}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Text Color"
                                        name="textColor"
                                        type="color"
                                        value={styleProps.textColor}
                                        onChange={handleInputChange}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Divider Color"
                                        name="dividerColor"
                                        type="color"
                                        value={styleProps.dividerColor}
                                        onChange={handleInputChange}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Secondary Text Color"
                                        name="secondaryTextColor"
                                        type="color"
                                        value={styleProps.secondaryTextColor}
                                        onChange={handleInputChange}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Title Size"
                                        name="sizeTitre"
                                        type="text"
                                        value={styleProps.sizeTitre}
                                        onChange={handleInputChange}
                                        isRequired={true}
                                    />
                                    <InputComponent
                                        label="Text Size"
                                        name="sizeText"
                                        type="text"
                                        value={styleProps.sizeText}
                                        onChange={handleInputChange}
                                        isRequired={true}
                                    />
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>

                <Box
                    w={{ base: '100%', md: '70%' }}
                    p={4}
                    bg={styleProps.bgColor}
                    color={styleProps.textColor}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Text fontSize={styleProps.sizeTitre} color={styleProps.textColor} mb={4}>
                        Nos Articles
                    </Text>
                    <Divider borderColor={styleProps.dividerColor} />
                    <Text fontSize={styleProps.sizeText} color={styleProps.secondaryTextColor} mt={4}>
                        This is some sample content.
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
};

export default StyleArticle;
