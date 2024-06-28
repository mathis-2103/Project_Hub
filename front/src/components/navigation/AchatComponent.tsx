import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    VStack,
    useColorModeValue,
    HStack,
    Text,
    Flex,
    Divider,
    StackDivider,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    FormControl,
    FormErrorMessage,
    Icon,
} from '@chakra-ui/react';
import { useTranslation } from "react-i18next";
import { FaShoppingCart, FaEnvelope, FaLock, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import AuthComponent from "./Log/AuthComponent";
import OrderModalComponent from "./OrderModalComponent";

const initialProducts = [
    { id: 1, name: 'Produit de Luxe A', price: 150, quantity: 1 },
    { id: 2, name: 'Produit de Luxe B', price: 250, quantity: 1 },
    { id: 3, name: 'Produit de Luxe C', price: 350, quantity: 1 },
];

const AchatComponent: React.FC = () => {
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef<HTMLButtonElement>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '', confirmPassword: '' });
    const [products, setProducts] = useState(initialProducts);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    const handleLogin = async () => {
        if (!email) {
            setError(prev => ({ ...prev, email: t('Email is required') }));
        }
        if (!password) {
            setError(prev => ({ ...prev, password: t('Password is required') }));
        }
        if (email && password) {
            try {
                const response = await axios.post('/api/client/login', { email, password });
                console.log('Login successful', response.data);
                setError({ email: '', password: '', confirmPassword: '' });
                onClose();
            } catch (err) {
                setError(prev => ({ ...prev, email: t('Invalid credentials') }));
            }
        }
    };

    const handleSignup = async () => {
        if (!email) {
            setError(prev => ({ ...prev, email: t('Email is required') }));
        }
        if (!password) {
            setError(prev => ({ ...prev, password: t('Password is required') }));
        }
        if (password !== confirmPassword) {
            setError(prev => ({ ...prev, confirmPassword: t('Passwords do not match') }));
        }
        if (email && password && password === confirmPassword) {
            try {
                const response = await axios.post('/api/client/register', { email, password });
                console.log('Signup successful', response.data);
                setError({ email: '', password: '', confirmPassword: '' });
                onClose();
            } catch (err) {
                setError(prev => ({ ...prev, email: t('Email already in use') }));
            }
        }
    };

    const handleQuantityChange = (id: number, delta: number) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, quantity: Math.max(1, product.quantity + delta) } : product
        ));
    };

    const handleRemoveProduct = (id: number) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

    const drawerBg = useColorModeValue("white", "gray.900");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const textColor = useColorModeValue("gray.800", "gray.200");
    const highlightColor = useColorModeValue("teal.600", "teal.200");

    return (
        <Box>
            <Button ref={btnRef} colorScheme="teal" onClick={onOpen} leftIcon={<FaShoppingCart />} size="lg" variant="solid">
                {t('Acheter')}
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                size="md"
            >
                <DrawerOverlay />
                <DrawerContent
                    mt={["15%", null, "5%"]}
                    bg={drawerBg}
                    boxShadow="xl"
                    style={{
                        height: '90%',
                        zIndex: 1502,
                        position: 'fixed',
                        top: 0,
                    }}
                >
                    <DrawerCloseButton size="lg" />
                    <DrawerHeader borderBottomWidth="2px" borderColor={borderColor} fontSize="2xl" fontWeight="bold">
                        {t('Complétez_votre_achat')}
                    </DrawerHeader>

                    <DrawerBody>
                        <Tabs isFitted variant="enclosed" colorScheme="teal">
                            <TabList mb="1em">
                                <Tab>{t('Se_connecter')}</Tab>
                                <Tab>{t('inscrire')}</Tab>
                            </TabList>
                            <AuthComponent />
                        </Tabs>
                        <Divider my={6} />
                        <Text fontSize="2xl" fontWeight="bold" mb={4} color={highlightColor} textAlign="center">{t('Vos_Achats')}</Text>
                        <VStack spacing={6} align="stretch" divider={<StackDivider borderColor={borderColor} />}>
                            {products.map((product) => (
                                <Flex key={product.id} direction="column" justify="space-between" p={4} borderRadius="lg" boxShadow="lg" _hover={{ boxShadow: "2xl", transform: "scale(1.02)" }} transition="all 0.3s ease-in-out" bg={drawerBg} border="1px solid" borderColor={borderColor}>
                                    <HStack spacing={4} align="center">
                                        <Box w={12} h={12} bg="gray.200" borderRadius="lg" overflow="hidden">
                                            {/* Placeholder for product image */}
                                        </Box>
                                        <Text fontSize="lg" fontWeight="medium" color={textColor}>{product.name}</Text>
                                        <HStack spacing={2}>
                                            <Button size="sm" onClick={() => handleQuantityChange(product.id, -1)} bg="transparent" _hover={{ bg: "red.100" }}><Icon as={FaMinus} /></Button>
                                            <Text>{product.quantity}</Text>
                                            <Button size="sm" onClick={() => handleQuantityChange(product.id, 1)} bg="transparent" _hover={{ bg: "green.100" }}><Icon as={FaPlus} /></Button>
                                        </HStack>
                                    </HStack>
                                    <Flex justify="space-between" align="center" mt={2}>
                                        <Text fontSize="lg" fontWeight="bold" color={textColor}>${(product.price * product.quantity).toFixed(2)}</Text>
                                        <Button size="sm" colorScheme="red" variant="outline" onClick={() => handleRemoveProduct(product.id)}><Icon as={FaTrash} /></Button>
                                    </Flex>
                                </Flex>
                            ))}
                        </VStack>
                        <HStack justify="space-between" mt={6} p={4} borderRadius="lg" boxShadow="lg" _hover={{ boxShadow: "2xl", transform: "scale(1.02)" }} transition="all 0.3s ease-in-out" bg={drawerBg} border="1px solid" borderColor={borderColor}>
                            <Text fontSize="xl" fontWeight="bold" color={highlightColor}>{t('Total')}:</Text>
                            <Text fontSize="xl" fontWeight="bold" color={highlightColor}>${totalPrice.toFixed(2)}</Text>
                        </HStack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="2px" borderColor={borderColor}>
                        <Button variant="outline" mr={3} onClick={onClose} size="lg">
                            {t('Annuler')}
                        </Button>
                        <Button colorScheme="teal" size="lg" onClick={() => setIsOrderModalOpen(true)}>
                            {t('Payer')}
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <OrderModalComponent
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
                products={products}
                handleQuantityChange={handleQuantityChange}
                handleRemoveProduct={handleRemoveProduct}
            />
        </Box>
    );
};

export default AchatComponent;
