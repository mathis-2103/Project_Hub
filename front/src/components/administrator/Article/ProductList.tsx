import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Text,
    IconButton,
    Heading,
    Button,
    Image,
    useToast,
    VStack
} from "@chakra-ui/react";
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import axios from 'axios';

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

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const toast = useToast();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const updateStock = async (productId: string, size: string, increment: number) => {
        const product = products.find(product => product._id === productId);
        if (!product) return;

        const updatedStockBySize = {
            ...product.stockBySize,
            [size]: (product.stockBySize[size] || 0) + increment
        };

        try {
            await axios.put(`/api/products/${productId}`, { stockBySize: updatedStockBySize });
            setProducts(products.map(p => p._id === productId ? { ...p, stockBySize: updatedStockBySize } : p));
            toast({
                title: "Stock mis à jour.",
                description: `Le stock pour la taille ${size} a été ${increment > 0 ? 'augmenté' : 'diminué'}.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error updating stock:', error);
            toast({
                title: "Erreur.",
                description: "Erreur lors de la mise à jour du stock.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const removeProduct = async (id: string) => {
        try {
            await axios.delete(`/api/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
            toast({
                title: "Produit supprimé.",
                description: "Le produit a été supprimé avec succès.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error deleting product:', error);
            toast({
                title: "Erreur.",
                description: "Erreur lors de la suppression du produit.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex overflowY={"auto"} bg="white" p={8} borderRadius="lg" boxShadow="2xl" width={{ base: "100%", md: "80%", lg: "60%" }} height={{ base: "100%", md: "70%" }} mx="auto" flexDirection="column">
            <Box width="100%">
                <Heading as="h1" size="2xl" mb={8} textAlign="center" color="#DAAB3A" fontFamily="serif" fontWeight="bold">
                    Liste des Produits
                </Heading>
                {products.map(product => (
                    <Flex key={product._id} direction={{ base: "column", md: "row" }} mb={8} p={4} borderBottom="1px solid #eee" boxShadow="lg" borderRadius="md" bg="gray.50">
                        <Image src={product.images[0]} alt={product.name} boxSize="150px" objectFit="cover" borderRadius="md" mr={4} />
                        <Box flex="1">
                            <Text fontSize="2xl" fontWeight="bold" fontFamily="serif" color="gray.800">{product.name}</Text>
                            <Text fontSize="lg" color="gray.600" fontFamily="serif">{product.category} - {product.title}</Text>
                            <Text fontSize="lg" color="gray.600" fontFamily="serif">Prix: {product.price} €</Text>
                            <Text fontSize="md" color="gray.600" fontFamily="serif">Matériau: {product.material}</Text>
                            <Text fontSize="md" color="gray.600" fontFamily="serif">Stock: {JSON.stringify(product.stockBySize)}</Text>
                        </Box>
                        <VStack spacing={2} align="start">
                            {Object.entries(product.stockBySize).map(([size, stock]) => (
                                <Flex key={size} alignItems="center" width="100%">
                                    <Text mr={4} fontSize="md" fontFamily="serif" color="gray.700">{size}: {stock}</Text>
                                    <Button
                                        leftIcon={<FaMinus />}
                                        size="sm"
                                        colorScheme="red"
                                        variant="outline"
                                        onClick={() => updateStock(product._id, size, -1)}
                                        isDisabled={stock <= 0}
                                    />
                                    <Button
                                        ml={3}
                                        leftIcon={<FaPlus />}
                                        size="sm"
                                        colorScheme="green"
                                        variant="outline"
                                        onClick={() => updateStock(product._id, size, 1)}
                                    />
                                </Flex>
                            ))}
                        </VStack>
                        <IconButton
                            icon={<FaTrash />}
                            aria-label="Remove product"
                            colorScheme="red"
                            variant="outline"
                            onClick={() => removeProduct(product._id)}
                            alignSelf={{ base: "flex-start", md: "center" }}
                        />
                    </Flex>
                ))}
            </Box>
        </Flex>
    );
};

export default ProductList;
