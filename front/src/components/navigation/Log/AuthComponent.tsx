import React, { useState } from 'react';
import {
    TabPanels, TabPanel, VStack, FormControl, FormErrorMessage, HStack, Icon, Input, Button,
    Alert, AlertIcon, useToast
} from '@chakra-ui/react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useTranslation } from "react-i18next";

type ErrorType = {
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
};

const AuthComponent = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<ErrorType>({});
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleLogin = async () => {
        setLoading(true);
        setError({});
        try {
            const response = await axios.post('/api/customers/login', { email, password });
            setLoading(false);
            toast({
                title: t('Connexion réussie'),
                description: t('Vous êtes maintenant connecté.'),
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            console.log('Connexion réussie', response.data);
        } catch (err) {
            setLoading(false);
            if (axios.isAxiosError(err) && err.response) {
                setError({ ...err.response.data });
            } else {
                setError({ general: t('Erreur inattendue. Veuillez réessayer.') });
                console.error('Unexpected error', err);
            }
        }
    };

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError({ confirmPassword: t('Les mots de passe ne correspondent pas') });
            return;
        }

        setLoading(true);
        setError({});
        try {
            const response = await axios.post('/api/customers/signup', { email, password });
            setLoading(false);
            toast({
                title: t('Inscription réussie'),
                description: t('Votre compte a été créé avec succès.'),
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            console.log('Inscription réussie', response.data);
        } catch (err) {
            setLoading(false);
            if (axios.isAxiosError(err) && err.response) {
                setError({ ...err.response.data });
            } else {
                setError({ general: t('Erreur inattendue. Veuillez réessayer.') });
                console.error('Unexpected error', err);
            }
        }
    };

    return (
        <TabPanels>
            <TabPanel>
                <VStack spacing={6} align="stretch">
                    {error.general && (
                        <Alert status="error">
                            <AlertIcon />
                            {error.general}
                        </Alert>
                    )}
                    <FormControl isInvalid={!!error.email}>
                        <HStack>
                            <Icon as={FaEnvelope} color="teal.500" w={5} h={5} />
                            <Input
                                placeholder={t('email')}
                                variant="outline"
                                focusBorderColor="teal.500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </HStack>
                        <FormErrorMessage>{error.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!error.password}>
                        <HStack>
                            <Icon as={FaLock} color="teal.500" w={5} h={5} />
                            <Input
                                placeholder={t('mdp')}
                                type="password"
                                variant="outline"
                                focusBorderColor="teal.500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </HStack>
                        <FormErrorMessage>{error.password}</FormErrorMessage>
                    </FormControl>
                    <Button
                        colorScheme="teal"
                        width="full"
                        mt={4}
                        onClick={handleLogin}
                        isLoading={loading}
                    >
                        {t('Se_connecter')}
                    </Button>
                </VStack>
            </TabPanel>
            <TabPanel>
                <VStack spacing={6} align="stretch">
                    {error.general && (
                        <Alert status="error">
                            <AlertIcon />
                            {error.general}
                        </Alert>
                    )}
                    <FormControl isInvalid={!!error.email}>
                        <HStack>
                            <Icon as={FaEnvelope} color="teal.500" w={5} h={5} />
                            <Input
                                placeholder={t('Email')}
                                variant="outline"
                                focusBorderColor="teal.500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </HStack>
                        <FormErrorMessage>{error.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!error.password}>
                        <HStack>
                            <Icon as={FaLock} color="teal.500" w={5} h={5} />
                            <Input
                                placeholder={t('mdp')}
                                type="password"
                                variant="outline"
                                focusBorderColor="teal.500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </HStack>
                        <FormErrorMessage>{error.password}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!error.confirmPassword}>
                        <HStack>
                            <Icon as={FaLock} color="teal.500" w={5} h={5} />
                            <Input
                                placeholder={t('Confirmer_mdp')}
                                type="password"
                                variant="outline"
                                focusBorderColor="teal.500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </HStack>
                        <FormErrorMessage>{error.confirmPassword}</FormErrorMessage>
                    </FormControl>
                    <Button
                        colorScheme="teal"
                        width="full"
                        mt={4}
                        onClick={handleSignup}
                        isLoading={loading}
                    >
                        {t('inscrire')}
                    </Button>
                </VStack>
            </TabPanel>
        </TabPanels>
    );
};

export default AuthComponent;
