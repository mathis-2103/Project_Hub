import React from 'react';
import {
    Box,
    VStack,
    HStack,
    Text,
    Divider,
    useColorModeValue,
    Icon,
    Flex,
    Button,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface Invoice {
    customerName: string;
    customerEmail: string;
    shippingAddress: string;
    products: Product[];
    totalPrice: number;
    orderDate: string;
    orderId: string;
    position: [number, number];
}

const invoices: Invoice[] = [
    {
        customerName: "John Doe",
        customerEmail: "john.doe@example.com",
        shippingAddress: "123 Rue de la Paix, 75002 Paris, France",
        products: [
            { id: 1, name: 'Produit de Luxe A', price: 150, quantity: 1 },
            { id: 2, name: 'Produit de Luxe B', price: 250, quantity: 1 },
            { id: 3, name: 'Produit de Luxe C', price: 350, quantity: 1 },
        ],
        totalPrice: 750,
        orderDate: "2024-06-27",
        orderId: "ORD123456",
        position: [48.8566, 2.3522], // Paris coordinates
    },
    {
        customerName: "Jane Smith",
        customerEmail: "jane.smith@example.com",
        shippingAddress: "1 panam, 75008 Paris, France",
        products: [
            { id: 4, name: 'Produit de Luxe D', price: 200, quantity: 1 },
            { id: 5, name: 'Produit de Luxe E', price: 300, quantity: 2 },
        ],
        totalPrice: 800,
        orderDate: "2024-06-28",
        orderId: "ORD654321",
        position: [48.8696, 2.3078], // Champs-Élysées coordinates
    },
    {
        customerName: "John Doe",
        customerEmail: "john.doe@example.com",
        shippingAddress: "123 Rue de la Paix, 75002 Paris, France",
        products: [
            { id: 1, name: 'Produit de Luxe A', price: 150, quantity: 1 },
            { id: 2, name: 'Produit de Luxe B', price: 250, quantity: 1 },
            { id: 3, name: 'Produit de Luxe C', price: 350, quantity: 1 },
        ],
        totalPrice: 750,
        orderDate: "2024-06-27",
        orderId: "ORD123456",
        position: [48.8566, 2.3522], // Paris coordinates
    },
];

const Factureclient: React.FC = () => {
    const bg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.800', 'gray.200');
    const highlightColor = useColorModeValue('#DAAB3A', '#DAAB3A');

    return (
        <Flex overflowX="auto" p={4}>
            {invoices.map((invoice, index) => (
                <Box
                    key={index}
                    bg={bg}
                    borderRadius="md"
                    boxShadow="xl"
                    border="1px solid"
                    borderColor={borderColor}
                    p={8}
                    maxWidth="800px"
                    m={4}
                >
                    <VStack spacing={4} align="stretch">
                        <HStack justify="space-between" align="center">
                            <Text fontSize="2xl" fontWeight="bold" color={highlightColor}>
                                Facture
                            </Text>
                            <Icon as={FaCheckCircle} color={highlightColor} w={8} h={8} />
                        </HStack>
                        <Divider />
                        <Box>
                            <Text fontSize="lg" fontWeight="bold" color={textColor}>
                                Détails du client
                            </Text>
                            <Text fontSize="md" color={textColor}>
                                {invoice.customerName}
                            </Text>
                            <Text fontSize="md" color={textColor}>
                                {invoice.customerEmail}
                            </Text>
                            <Text fontSize="md" color={textColor}>
                                {invoice.shippingAddress}
                            </Text>
                        </Box>
                        <Divider />
                        <Box>
                            <Text fontSize="lg" fontWeight="bold" color={textColor}>
                                Détails de la commande
                            </Text>
                            <Text fontSize="md" color={textColor}>
                                Date de commande: {invoice.orderDate}
                            </Text>
                            <Text fontSize="md" color={textColor}>
                                ID de commande: {invoice.orderId}
                            </Text>
                        </Box>
                        <Divider />
                        <Box>
                            <Text fontSize="lg" fontWeight="bold" color={textColor}>
                                Produits
                            </Text>
                            {invoice.products.map((product) => (
                                <Flex key={product.id} justify="space-between">
                                    <Text fontSize="md" color={textColor}>
                                        {product.name} x{product.quantity}
                                    </Text>
                                    <Text fontSize="md" color={textColor}>
                                        ${product.price.toFixed(2)}
                                    </Text>
                                </Flex>
                            ))}
                        </Box>
                        <Divider />
                        <Flex justify="space-between">
                            <Text fontSize="lg" fontWeight="bold" color={textColor}>
                                Total
                            </Text>
                            <Text fontSize="lg" fontWeight="bold" color={highlightColor}>
                                ${invoice.totalPrice.toFixed(2)}
                            </Text>
                        </Flex>
                        <Button bg='#DAAB3A' size="lg" mt={4}>
                            Imprimer la facture
                        </Button>
                    </VStack>
                </Box>
            ))}
        </Flex>
    );
};

export default Factureclient;
