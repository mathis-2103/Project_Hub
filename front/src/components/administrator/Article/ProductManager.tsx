import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    VStack,
    useToast,
    Grid,
    Image,
    IconButton,
    SimpleGrid,
    Heading,
} from "@chakra-ui/react";
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

interface Product {
    id?: string;
    name: string;
    price: number;
    category: string;
    title: string;
    stockBySize: Record<string, number>;
    description: string;
    material: string;
    images: string[];
}

const ProductManager: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [stockBySize, setStockBySize] = useState('');
    const [description, setDescription] = useState('');
    const [material, setMaterial] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [titles, setTitles] = useState<string[]>([]);
    const toast = useToast();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data.map((cat: any) => cat.name));
            } catch (error) {
                toast({
                    title: "Erreur",
                    description: "Erreur lors du chargement des catégories.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        const fetchTitles = async () => {
            try {
                const response = await axios.get('/api/titles');
                setTitles(response.data.map((title: any) => title.name));
            } catch (error) {
                toast({
                    title: "Erreur",
                    description: "Erreur lors du chargement des titres.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        fetchCategories();
        fetchTitles();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFiles(Array.from(e.target.files));
        }
    };

    const handleAddProduct = async () => {
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            toast({
                title: "Erreur",
                description: "Le prix doit être un nombre positif.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const stock = stockBySize.split(',').reduce((acc, curr) => {
            const [size, quantity] = curr.split(':');
            if (size && quantity && !isNaN(parseInt(quantity.trim()))) {
                acc[size.trim()] = parseInt(quantity.trim());
            }
            return acc;
        }, {} as Record<string, number>);

        const images: string[] = [];

        if (Object.keys(stock).length === 0 || Object.values(stock).some(quantity => quantity < 0)) {
            toast({
                title: "Erreur",
                description: "Stock par taille doit contenir des valeurs numériques positives.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const newProduct: Product = {
            name,
            price: parsedPrice,
            category,
            title,
            stockBySize: stock,
            description,
            material,
            images,
        };

        try {
            const response = await axios.post('/api/products', newProduct);
            toast({
                title: "Produit ajouté.",
                description: "Le produit a été ajouté avec succès.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setName('');
            setPrice('');
            setCategory('');
            setTitle('');
            setStockBySize('');
            setDescription('');
            setMaterial('');
            setImageFiles([]);
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Erreur lors de l'ajout du produit.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const removeImage = (index: number) => {
        const updatedFiles = imageFiles.filter((_, i) => i !== index);
        setImageFiles(updatedFiles);
    };

    return (
        <Box overflowY={"auto"} bg="white" p={5} borderRadius="lg" boxShadow="2xl" width={{ base: "100%", md: "80%", lg: "60%" }} height={{ base: "100%", md: "70%" }} mx="auto" mb={8}>
            <Heading as="h1" size="xl" mb={6} textAlign="center" color="#DAAB3A">Ajouté des Produits</Heading>
            <VStack spacing={4} width="100%">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} width="100%">
                    <FormControl id="name" isRequired>
                        <FormLabel>Nom du produit</FormLabel>
                        <Input placeholder="Nom du produit" value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl id="price" isRequired>
                        <FormLabel>Prix</FormLabel>
                        <Input type="number" placeholder="Prix" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </FormControl>
                    <FormControl id="category" isRequired>
                        <FormLabel>Catégorie</FormLabel>
                        <Select placeholder="Sélectionnez la catégorie" value={category} onChange={(e) => setCategory(e.target.value)}>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl id="title" isRequired>
                        <FormLabel>Titre</FormLabel>
                        <Select placeholder="Sélectionnez le titre" value={title} onChange={(e) => setTitle(e.target.value)}>
                            {titles.map((tit) => (
                                <option key={tit} value={tit}>{tit}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl id="stockBySize" isRequired>
                        <FormLabel>Stock par Taille (ex: S:10,M:5,L:2)</FormLabel>
                        <Input placeholder="Stock par taille" value={stockBySize} onChange={(e) => setStockBySize(e.target.value)} />
                    </FormControl>
                    <FormControl id="description" isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </FormControl>
                    <FormControl id="material" isRequired>
                        <FormLabel>Matériau</FormLabel>
                        <Input placeholder="Matériau" value={material} onChange={(e) => setMaterial(e.target.value)} />
                    </FormControl>
                    <FormControl id="imageFiles">
                        <FormLabel>Images du produit</FormLabel>
                        <Input type="file" accept="image/*" multiple onChange={handleFileChange} />
                        <Grid mt={2} templateColumns="repeat(auto-fill, minmax(75px, 1fr))" gap={2}>
                            {imageFiles.map((file, index) => (
                                <Box key={index} position="relative">
                                    <Image src={URL.createObjectURL(file)} boxSize="75px" objectFit="cover" borderRadius="md" />
                                    <IconButton
                                        icon={<FaTrash />}
                                        size="sm"
                                        colorScheme="red"
                                        position="absolute"
                                        top="0"
                                        right="0"
                                        onClick={() => removeImage(index)}
                                        aria-label="Remove image"
                                    />
                                </Box>
                            ))}
                        </Grid>
                    </FormControl>
                </SimpleGrid>
                <Button bg="#DAAB3A" color="white" _hover={{ bg: "#C99C33" }} size="lg" onClick={handleAddProduct} width="100%">
                    Ajouter le Produit
                </Button>
            </VStack>
        </Box>
    );
};

export default ProductManager;
