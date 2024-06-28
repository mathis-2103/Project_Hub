import React from 'react';
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
    VStack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';

const PurchaseDrawer: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef<HTMLButtonElement>(null);

    return (
        <Box>
            <Button ref={btnRef} colorScheme="teal" onClick={onOpen} leftIcon={<FaShoppingBag />}>
                Mes Achats
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent bg={useColorModeValue("gray.50", "gray.800")}>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px" borderColor="gray.200">Vos Achats</DrawerHeader>

                    <DrawerBody>
                        <VStack spacing={4} align="stretch">
                            <Text>Achat 1</Text>
                            <Text>Achat 2</Text>
                            <Text>Achat 3</Text>
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px" borderColor="gray.200">
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Fermer
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default PurchaseDrawer;
