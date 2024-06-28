import React, {useEffect, useRef, useState} from 'react';
import {Box, Grid, Image, IconButton, Text, Button, Flex, Divider, Spinner} from '@chakra-ui/react';
import {AddIcon, DeleteIcon} from '@chakra-ui/icons';
import axios from 'axios';
import {getAuthorizedHeader} from '../../common/auth';

function Gallery() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const photos_url = process.env.REACT_APP_API_URL as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      setLoading(true);

      const formData = new FormData();
      formData.append('image', fileInput.files[0]);

      try {
        await axios.post('/api/image/upload', formData, {headers: getAuthorizedHeader()});
        fetchImages();
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image :', error);
      } finally {
        setLoading(false);
        fileInput.value = '';
      }
    }
  };

  async function fetchImages() {
    try {
      const response = await axios.get('/api/images');
      setPhotos(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des images :', error);
    }
  }

  useEffect(() => {
    fetchImages();
  }, []);

  async function handleDelete(index: number) {
    try {
      const imageId = photos[index];
      await axios.delete(`/api/image/${imageId}`, {headers: getAuthorizedHeader()});
      setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image :', error);
    }
  }

  return (
    <Box bg="#DAAB3A" id="galleries" borderWidth="2px" borderRadius="lg" p="4" m="4">
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Text fontSize="xl">Ma Galerie :</Text>
        <Button
          bg="#EEE6D8"
          leftIcon={<AddIcon/>}
          onClick={handleUploadImage}
          _hover={{bg: '#CCC0A4'}}
        >
          Ajouter une photo
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{display: 'none'}}
          onChange={handleFileChange}
        />
      </Flex>
      <Divider mb="4"/>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
        {photos.length > 0 && photos.map((photo, index) => (
          <Box key={index} position="relative" textAlign="center">
            <Image
              src={photos_url + '/api/image/' + photo}
              alt={`Photo ${index + 1}`}
              objectFit="cover"
              borderRadius="lg"
              boxSize="100%"
              boxShadow="md"
              transition="transform 0.2s"
              _hover={{transform: 'scale(1.05)'}}
            />
            <IconButton
              icon={<DeleteIcon/>}
              colorScheme="red"
              size="sm"
              position="absolute"
              top="2"
              right="2"
              onClick={() => handleDelete(index)}
              aria-label={`Supprimer la photo ${index + 1}`}
            />
          </Box>
        ))}
      </Grid>
      {loading && (
        <Flex justifyContent="center" mt="4">
          <Spinner size="lg" color="teal.500"/>
        </Flex>
      )}
    </Box>
  );
}

export default Gallery;
