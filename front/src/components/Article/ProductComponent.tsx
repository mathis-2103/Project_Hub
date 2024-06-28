import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Image,
    Text,
    VStack,
    Box,
    HStack,
    Divider,
    SimpleGrid,
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    title: string;
    stockBySize: Record<string, number>;
    description: string;
    material: string;
    images: string[];
}

interface ProductComponentProps {
    products: Product[];
}

const styleConfig = {
    modalBgColor: "white",
    modalHeaderBorderColor: "gray.200",
    modalBodyBgColor: "gray.100",
    modalContentBorderColor: "#e2e8f0",
    textColors: {
        name: "gray.800",
        description: "gray.600",
        price: "teal.500",
        category: "gray.500",
        material: "gray.800"
    },
    buttonStyles: {
        sizeButtonBgColor: "gray.200",
        sizeButtonBorderColor: "gray.300",
        sizeButtonTextColor: "gray.800",
        sizeButtonHoverBg: "gray.50",
        addToCartButtonColorScheme: "teal",
        addToCartButtonHoverBg: "teal.600"
    },
    textSize: {
        header: "2xl",
        price: "2xl",
        name: "lg",
        description: "md",
        material: "md"
    },
    modalBoxSize: "400px"
};

const ProductComponent: React.FC<ProductComponentProps> = ({ products }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const openModal = (product: Product) => {
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsOpen(false);
    };

    return (
        <Box p={5}>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
                {products.map(product => (
                    <Box
                        key={product._id}
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="md"
                        bg={styleConfig.modalBgColor}
                        p={5}
                        onClick={() => openModal(product)}
                        cursor="pointer"
                    >
                        <Text fontSize="xl" mt={2} fontWeight="bold">{product.name}</Text>
                        <Image src={product.images[0]} alt={product.name} borderRadius="md" />
                        <Text mt={2} color={styleConfig.textColors.description}>{product.description}</Text>
                        <Text fontSize="lg" mt={2} color={styleConfig.textColors.price}>{product.price} €</Text>
                    </Box>
                ))}
            </SimpleGrid>

            {selectedProduct && (
                <Modal isOpen={isOpen} onClose={closeModal} size="xl">
                    <ModalOverlay />
                    <ModalContent bg={styleConfig.modalBgColor} borderRadius="lg" boxShadow="2xl" border={`1px solid ${styleConfig.modalContentBorderColor}`}>
                        <ModalHeader fontSize={styleConfig.textSize.header} fontWeight="bold" textAlign="center" borderBottomWidth="1px" borderColor={styleConfig.modalHeaderBorderColor}>
                            {selectedProduct.name}
                        </ModalHeader>
                        <ModalCloseButton
                            position="absolute"
                            top="1rem"
                            right="1rem"
                            bg="transparent"
                            _hover={{ bg: 'transparent' }}
                            _active={{ bg: 'transparent' }}
                            sx={{
                                '& svg': {
                                    transition: 'all 0.2s ease-in-out',
                                },
                                '& svg path': {
                                    stroke: 'gray',
                                    transition: 'stroke 0.3s ease-in-out',
                                },
                                '&:hover svg path': {
                                    stroke: 'red',
                                    transition: 'stroke 0.5s ease-in-out 0s',
                                },
                            }}
                        />
                        <ModalBody>
                            <VStack spacing={8}>
                                <Box height="450px" width="100%" borderRadius="lg" overflow="hidden">
                                    {selectedProduct.images.map((image, index) => (
                                        <Box key={index} display="flex" justifyContent="center" alignItems="center" bg={styleConfig.modalBodyBgColor}>
                                            <Image src={image} alt={selectedProduct.name} boxSize={styleConfig.modalBoxSize} objectFit="contain" />
                                        </Box>
                                    ))}
                                </Box>
                                <Divider borderColor="gray.300" />
                                <Text fontSize={styleConfig.textSize.price} fontWeight="bold" transition="transform 0.2s" _hover={{ transform: 'scale(1.1)' }} color={styleConfig.textColors.price}>
                                    {selectedProduct.price} €
                                </Text>
                                <Text fontSize={styleConfig.textSize.name} transition="transform 0.2s" _hover={{ transform: 'scale(1.1)' }} color={styleConfig.textColors.name}>
                                    {selectedProduct.name}
                                </Text>
                                <Text color={styleConfig.textColors.description} textAlign="center" fontSize={styleConfig.textSize.description}>
                                    {selectedProduct.description}
                                </Text>
                                <HStack spacing={2} alignItems="center">
                                    <Text fontWeight="bold" color={styleConfig.textColors.material} fontSize={styleConfig.textSize.material}>Material: {selectedProduct.material}</Text>
                                </HStack>
                                <Box width="100%">
                                    <Text fontWeight="bold" color={styleConfig.textColors.material} mb={2} fontSize={styleConfig.textSize.material}>Sizes Available:</Text>
                                    <Box display="flex" flexWrap="wrap" justifyContent="center">
                                        {Object.entries(selectedProduct.stockBySize).map(([size, stock]) => (
                                            <Button
                                                key={size}
                                                p={3}
                                                m={2}
                                                borderRadius="full"
                                                bg={styleConfig.buttonStyles.sizeButtonBgColor}
                                                borderColor={styleConfig.buttonStyles.sizeButtonBorderColor}
                                                borderWidth={2}
                                                color={styleConfig.buttonStyles.sizeButtonTextColor}
                                                isDisabled={stock === 0}
                                                _hover={{ bg: stock === 0 ? styleConfig.buttonStyles.sizeButtonBgColor : styleConfig.buttonStyles.sizeButtonHoverBg, transform: stock === 0 ? 'none' : 'scale(1.1)' }}
                                                _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
                                            >
                                                {size}
                                            </Button>
                                        ))}
                                    </Box>
                                </Box>
                            </VStack>
                        </ModalBody>
                        <ModalFooter justifyContent="center">
                            <Button
                                leftIcon={<FaShoppingCart />}
                                colorScheme={styleConfig.buttonStyles.addToCartButtonColorScheme}
                                variant="solid"
                                size="lg"
                                borderRadius="full"
                                boxShadow="lg"
                                _hover={{ bg: styleConfig.buttonStyles.addToCartButtonHoverBg }}
                            >
                                Add to Cart
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
};

export default ProductComponent;
