import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Text, VStack, IconButton, useToast, Heading, Select } from "@chakra-ui/react";
import { FaTrash } from 'react-icons/fa';
import axios from "axios";

interface Title {
    _id: string;
    name: string;
    category: {
        _id: string;
        name: string;
    };
}

interface Category {
    _id: string;
    name: string;
}

const TitleManager: React.FC = () => {
    const [titles, setTitles] = useState<Title[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const toast = useToast();

    useEffect(() => {
        fetchTitles();
        fetchCategories();
    }, []);

    const fetchTitles = async () => {
        try {
            const response = await axios.get('/api/titles');
            setTitles(response.data);
        } catch (error) {
            console.error('Error fetching titles:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddTitle = async () => {
        if (!name || !category) {
            toast({
                title: 'Erreur',
                description: "Veuillez remplir tous les champs.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            const data = { name, category };
            console.log("Sending data:", data);
            const response = await axios.post('/api/titles', data);
            setTitles([...titles, response.data]);
            setName('');
            setCategory('');
            toast({
                title: 'Succès',
                description: "Titre ajouté avec succès.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error adding title:', error);
            toast({
                title: 'Erreur',
                description: "Erreur lors de l'ajout du titre.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleDeleteTitle = async (id: string) => {
        try {
            await axios.delete(`/api/titles/${id}`);
            setTitles(titles.filter(title => title._id !== id));
            toast({
                title: 'Succès',
                description: "Titre supprimé avec succès.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error deleting title:', error);
            toast({
                title: 'Erreur',
                description: "Erreur lors de la suppression du titre.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box bg="white" p={8} borderRadius="lg" boxShadow="2xl" width={{ base: "90%", md: "50%" }} mx="auto" mt={8}>
            <Heading as="h1" size="xl" mb={6} textAlign="center" color="#DAAB3A">Gérer les Titres</Heading>
            <VStack spacing={6}>
                {titles.map(title => (
                    <Flex key={title._id} width="100%" justifyContent="space-between" alignItems="center" bg="gray.100" p={4} borderRadius="md" boxShadow="sm">
                        <Text fontSize="lg" fontWeight="medium" color="gray.700">{title.name} ({title.category.name})</Text>
                        <IconButton icon={<FaTrash />} aria-label="Remove title" colorScheme="red" onClick={() => handleDeleteTitle(title._id)} />
                    </Flex>
                ))}
                <FormControl id="new-title" bg="gray.50" p={4} borderRadius="md" boxShadow="sm" width="100%">
                    <FormLabel fontWeight="bold" color="#DAAB3A">Nouveau Titre</FormLabel>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Entrez le nom du titre" mb={3} />
                    <Select placeholder="Sélectionnez la catégorie du titre" value={category} onChange={(e) => setCategory(e.target.value)} mb={3}>
                        {categories.map(category => (
                            <option key={category._id} value={category.name}>{category.name}</option>
                        ))}
                    </Select>
                    <Button bg="#DAAB3A" color="white" _hover={{ bg: "#C99C33" }}  onClick={handleAddTitle} width="100%">Ajouter Titre</Button>
                </FormControl>
            </VStack>
        </Box>
    );
};

export default TitleManager;
