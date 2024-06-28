import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Text, VStack, IconButton, useToast, Heading } from "@chakra-ui/react";
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

interface Category {
    _id?: string;
    name: string;
}

const CategoryManager: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddCategory = async () => {
        try {
            const response = await axios.post('/api/categories', { name });
            setCategories([...categories, response.data]);
            setName('');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            await axios.delete(`/api/categories/${id}`);
            setCategories(categories.filter(category => category._id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <Box bg="white" p={8} borderRadius="lg" boxShadow="2xl" width={{ base: "90%", md: "50%" }} mx="auto" mt={8}>
            <Heading as="h1" size="xl" mb={6} textAlign="center" color="#DAAB3A">Gérer les Catégories</Heading>
            <VStack spacing={6}>
                {categories.map(category => (
                    <Flex key={category._id} width="100%" justifyContent="space-between" alignItems="center" bg="gray.100" p={4} borderRadius="md" boxShadow="sm">
                        <Text fontSize="lg" fontWeight="medium" color="gray.700">{category.name}</Text>
                        <IconButton icon={<FaTrash />} aria-label="Remove category" colorScheme="red" onClick={() => handleDeleteCategory(category._id || '')} />
                    </Flex>
                ))}
                <FormControl id="new-category" bg="gray.50" p={4} borderRadius="md" boxShadow="sm" width="100%">
                    <FormLabel fontWeight="bold" color="#DAAB3A">Nouvelle Catégorie</FormLabel>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Entrez le nom de la catégorie" mb={3} />
                    <Button bg="#DAAB3A" color="white" _hover={{ bg: "#C99C33" }} onClick={handleAddCategory} width="100%">
                        Ajouter Catégorie</Button>
                </FormControl>
            </VStack>
        </Box>
    );
};

export default CategoryManager;
