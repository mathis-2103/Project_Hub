import {Box, Flex, Image, Text, Link, useColorModeValue, Divider, Center} from "@chakra-ui/react";
import {useTranslation} from 'react-i18next';
import React, {useEffect, useState, CSSProperties} from "react";
import axios from 'axios';

interface ContactComponentStyleProps {
    containerBgColor: string;
    formBgColor: string;
    inputBorderColor: string;
    inputTextColor: string;
    buttonBgColor: string;
    buttonHoverBgColor: string;
    buttonTextColor: string;
    titleFontSize: string;
    titleFontColor: string;
}

const defaultContactComponentStyleProps: ContactComponentStyleProps = {
    containerBgColor: "#EEE6D8",
    formBgColor: "#FFFFFF",
    inputBorderColor: "#E2E8F0",
    inputTextColor: "#111439",
    buttonBgColor: "teal",
    buttonHoverBgColor: "teal.600",
    buttonTextColor: "#FFFFFF",
    titleFontSize: "4xl",
    titleFontColor: "#111439"
};

type DetailsProps = {
    title: string, content: string, icon: string, alt: string
}

function ContactComponent() {
    const {t} = useTranslation();
    const [styleProps, setStyleProps] = useState<ContactComponentStyleProps>(defaultContactComponentStyleProps);

    useEffect(() => {
        const fetchStyleProps = async () => {
            try {
                const response = await axios.get('/api/contactstyle');
                if (response.data) {
                    setStyleProps(response.data);
                }
            } catch (error) {
                console.error('Erreur lors du chargement du style :', error);
            }
        };

        fetchStyleProps();
    }, []);

    const contactItems = [
        {
            icon: require('../assets/contact/phone.png'),
            alt: "Phone",
            title: t("phone"),
            content: '04 28 29 33 25',
        },
        {
            icon: require('../assets/contact/address.png'),
            alt: "Address",
            title: t("address"),
            content: '2 Rue du Professeur Charles Appleton, 69007 Lyon',
        },
        {
            icon: require('../assets/contact/email.png'),
            alt: "Email",
            title: t("email"),
            content: t("lyon@epitech.eu"),
        },
    ];

    const imageStyle: CSSProperties = {
        margin: "0 auto",
        marginBottom: "20px",
    }

    function Detail(props: DetailsProps) {
        return (
            <Box textAlign="center" mx={4} my={10} flex="1 0 300px">
                <Image src={props.icon} alt={props.alt} style={imageStyle} boxSize="100px"/>
                <Text fontSize="2xl" color={styleProps.inputTextColor}>
                    {props.title}
                </Text>
                <Link fontSize="xl" color={styleProps.inputTextColor}>
                    {props.content}
                </Link>
            </Box>
        )
    }

    return (
        <Box id="contact" textAlign="center" py={{base: 8, md: 12}} px={4} bg={useColorModeValue(styleProps.containerBgColor, "  #deb887")}>
            <Center>
                <Divider my={4} w="20%" borderColor="black" />
            </Center>
            <Text fontSize={{base: styleProps.titleFontSize, md: styleProps.titleFontSize}} textAlign="center" color={styleProps.titleFontColor}>
                {t('contactTitle')}
            </Text>
            <Box ml={10}/>
            <Flex justify="center" flexWrap="wrap">
                {contactItems.map((item, index) => (
                    <Detail key={index} alt={item.alt} icon={item.icon} title={item.title} content={item.content} />
                ))}
            </Flex>
        </Box>
    );
}

export default ContactComponent;
