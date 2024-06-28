import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface CarouselComponentStyleProps {
    containerBgColor: string;
    textColor: string;
    titleFontSize: string;
    titleFontColor: string;
    carouselBgColor: string;
    arrowColor: string;
    imageBorderColor: string;
    imageBorderWidth: string;
    imageMaxHeight: string;
}

const defaultCarouselComponentStyleProps: CarouselComponentStyleProps = {
    containerBgColor: "#DAAB3A",
    textColor: "white",
    titleFontSize: "4xl",
    titleFontColor: "black",
    carouselBgColor: "white",
    arrowColor: "black",
    imageBorderColor: "white",
    imageBorderWidth: "2px",
    imageMaxHeight: "400px"
};

const CarouselComponent: React.FC = () => {
    const { t } = useTranslation();
    const [photos, setPhotos] = useState<string[]>([]);
    const [styleProps, setStyleProps] = useState<CarouselComponentStyleProps>(defaultCarouselComponentStyleProps);
    const url = process.env.REACT_APP_API_URL as string;

    async function fetchImages() {
        try {
            const response = await axios.get('/api/images');
            setPhotos(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des images :', error);
        }
    }

    async function fetchStyleProps() {
        try {
            const response = await axios.get('/api/carouselstyle');
            if (response.data) {
                setStyleProps(response.data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement du style :', error);
        }
    }

    useEffect(() => {
        fetchImages();
        fetchStyleProps();
    }, []);

    return (
        <Box id="galleries" textAlign="center" bg={styleProps.containerBgColor} color={styleProps.textColor} py={{ base: 8, md: 12 }}>
            <Text fontSize={{ base: styleProps.titleFontSize, md: '6xl' }} color={styleProps.titleFontColor}>
                {t('galleries')}
            </Text>
            <Box maxW="1000px" mx="auto" marginY={4}>
                <Box overflow="hidden" margin={4} bg={styleProps.carouselBgColor}>
                    {photos.length === 0 ? (
                        <p>{t('erreurCarou')}</p>
                    ) : (
                        <Carousel showArrows={true} infiniteLoop={true} showStatus={false} showThumbs={false} autoPlay={true} interval={2000}>
                            {photos.map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={url + '/api/image/' + image}
                                        alt={`product ${index}`}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: styleProps.imageMaxHeight,
                                            border: `${styleProps.imageBorderWidth} solid ${styleProps.imageBorderColor}`
                                        }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default CarouselComponent;
