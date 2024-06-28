import React from "react";
import {Box} from '@chakra-ui/react';
import NavBarComponent from '../components/navigation/NavBarComponent';
import MapSiteComponent from '../components/MapSiteComponent';
import LoginComponent, {LoginFormData} from '../components/LoginComponent';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

function LoginScreen() {
  const navigate = useNavigate();
  async function tryLogin(data: LoginFormData) {
    try {
      const response = await axios.post('/api/auth/login', data);
      const token = response.data.token;

      Cookies.set('token', token);
      navigate('/administrator');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Une erreur s\'est produite lors de la connexion. Veuillez réessayer.');
    }
  }
  return (
    <Box>
      <NavBarComponent/>
      <LoginComponent callback={tryLogin}/>
      <MapSiteComponent/>
    </Box>
  )
}
export default LoginScreen;
