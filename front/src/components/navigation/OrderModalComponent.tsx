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
    FormControl,
    FormLabel,
    Input,
    VStack,
    Box,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useColorModeValue,
    HStack,
    Text,
    Flex,
    Icon,
    StackDivider,
    Divider
} from '@chakra-ui/react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useTranslation } from "react-i18next";

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface OrderModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    products: Product[];
    handleQuantityChange: (id: number, delta: number) => void;
    handleRemoveProduct: (id: number) => void;
}

const steps = [
    { title: 'Valider les articles', description: '' },
    { title: 'Adresse de livraison', description: '' },
    { title: 'Informations bancaires', description: '' },
];

const OrderModalComponent: React.FC<OrderModalComponentProps> = ({ isOpen, onClose, products, handleQuantityChange, handleRemoveProduct }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState(0);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [name, setName] = useState('');

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const modalBgColor = useColorModeValue('white', 'gray.800');
    const headerBgColor = useColorModeValue('gray.100', 'gray.700');
    const headerFontColor = useColorModeValue('gray.800', 'white');
    const bodyFontColor = useColorModeValue('gray.600', 'gray.300');
    const drawerBg = useColorModeValue("white", "gray.900");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const textColor = useColorModeValue("gray.800", "gray.200");
    const highlightColor = useColorModeValue("teal.600", "teal.200");

    const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
                maxWidth={{ base: "90%", md: "600px" }}
                width="100%"
                maxHeight="90vh"
                bg={modalBgColor}
                borderRadius="md"
                boxShadow="lg"
            >
                <ModalHeader
                    bg={headerBgColor}
                    color={headerFontColor}
                    borderTopRadius="md"
                    fontSize="xl"
                    fontWeight="bold"
                >
                    {t('Passer commande')}
                </ModalHeader>
                <ModalCloseButton color={headerFontColor} />
                <ModalBody color={bodyFontColor}>
                    <Stepper index={step} width="100%" colorScheme="teal">
                        {steps.map((stepItem, index) => (
                            <Step key={index}>
                                <VStack>
                                    <StepTitle>{t(stepItem.title)}</StepTitle>
                                    <StepIndicator>
                                        <StepStatus
                                            complete={<StepIcon />}
                                            incomplete={<StepNumber />}
                                            active={<StepNumber />}
                                        />
                                    </StepIndicator>
                                </VStack>
                                {index < steps.length - 1 && <StepSeparator />}
                            </Step>
                        ))}
                    </Stepper>

                    {step === 0 && (
                        <>
                            <VStack spacing={4} mt={6} align="stretch" divider={<StackDivider borderColor={borderColor} />}>
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
                        </>
                    )}
                    {step === 1 && (
                        <VStack spacing={4} mt={6}>
                            <FormControl id="city">
                                <FormLabel>{t('Nom de la ville')}</FormLabel>
                                <Input placeholder={t('Nom de la ville')} />
                            </FormControl>
                            <FormControl id="street">
                                <FormLabel>{t('Nom et numéro de rue')}</FormLabel>
                                <Input placeholder={t('Nom et numéro de rue')} />
                            </FormControl>
                            <FormControl id="postalCode">
                                <FormLabel>{t('Code postal')}</FormLabel>
                                <Input placeholder={t('Code postal')} />
                            </FormControl>
                        </VStack>
                    )}
                    {step === 2 && (
                        <Box mt={6} p={4} height={"250px"} width="100%" maxWidth="500px" borderRadius="lg" boxShadow="lg" bg="purple" border="1px solid" borderColor={borderColor} backgroundImage={`url('/mnt/data/1892BF68-3507-4BB3-A165-01EEE3D87EB6.jpeg')`} backgroundSize="cover" backgroundPosition="center" position="relative">
                            <VStack spacing={4} align="left" justify="center" height="100%">
                                <FormControl id="cardNumber">
                                    <FormLabel srOnly>{t('Numéro de carte bancaire')}</FormLabel>
                                    <Input
                                        placeholder="0000 0000 0000 0000"
                                        value={cardNumber}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value) && value.length <= 16) {
                                                setCardNumber(value);
                                            }
                                        }}
                                        bg="transparent"
                                        border="none"
                                        fontSize="xl"
                                        color="black"
                                        letterSpacing="2px"
                                        width="65%"
                                        _focus={{ boxShadow: 'none', border: 'none' }}
                                    />
                                    <Divider width="65%"/>
                                </FormControl>
                                <HStack spacing={4} width="100%">
                                    <FormControl id="expiryDate">
                                        <FormLabel srOnly>{t("Date d'expiration")}</FormLabel>
                                        <Input
                                            placeholder="MM/AA"
                                            value={expiryDate}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '');
                                                if (value.length <= 4) {
                                                    let formattedValue = value;
                                                    if (value.length > 2) {
                                                        formattedValue = value.slice(0, 2) + '/' + value.slice(2);
                                                    }
                                                    setExpiryDate(formattedValue);
                                                }
                                            }}
                                            bg="transparent"
                                            border="none"
                                            fontSize="xl"
                                            color="black"
                                            textAlign="left"
                                            width="45%"
                                            _focus={{ boxShadow: 'none', border: 'none' }}
                                        />
                                        <Divider width="45%"/>
                                    </FormControl>
                                    <FormControl id="cvc">
                                        <FormLabel srOnly>{t('CVC')}</FormLabel>
                                        <Input
                                            placeholder="CVC"
                                            value={cvc}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '');
                                                if (value.length <= 3) {
                                                    setCvc(value);
                                                }
                                            }}
                                            bg="transparent"
                                            border="none"
                                            fontSize="xl"
                                            color="black"
                                            textAlign="left"
                                            width="40%"
                                            _focus={{ boxShadow: 'none', border: 'none' }}
                                        />
                                        <Divider width="40%"/>
                                    </FormControl>
                                </HStack>
                                <FormControl id="name">
                                    <FormLabel srOnly>{t('Nom')}</FormLabel>
                                    <Input
                                        placeholder={t('Nom')}
                                        value={name}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Supprime tout sauf les lettres et les espaces
                                            setName(value);
                                        }}
                                        bg="transparent"
                                        border="none"
                                        fontSize="xl"
                                        color="black"
                                        textAlign="left"
                                        width="50%"
                                        _focus={{ boxShadow: 'none', border: 'none' }}
                                    />
                                    <Divider width="50%"/>
                                </FormControl>
                            </VStack>
                            <Divider position="absolute" bottom="0" left="0" right="0" height="35px" bg="blue.800" />
                        </Box>
                    )}
                </ModalBody>

                <ModalFooter>
                    {step > 0 && (
                        <Button variant="ghost" mr={3} onClick={prevStep} colorScheme="teal">
                            {t('Retour')}
                        </Button>
                    )}
                    {step < steps.length - 1 ? (
                        <Button colorScheme="teal" onClick={nextStep}>
                            {t('Suivant')}
                        </Button>
                    ) : (
                        <Button colorScheme="teal" onClick={onClose}>
                            {t('Valider')}
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default OrderModalComponent;
