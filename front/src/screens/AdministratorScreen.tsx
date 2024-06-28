import React, {CSSProperties, useEffect} from "react";
import {Box} from '@chakra-ui/react';
import NavBarComponent from '../components/navigation/NavBarComponent';
import MapSiteComponent from '../components/MapSiteComponent';
import {checkIfUserIsLoggedIn} from '../components/LoginComponent';
import {useNavigate} from 'react-router-dom';
import "../theme/index.css"
import ServiceCard from '../components/administrator/ServiceCard';
import {faClock, faImages, faPen, faTshirt, faUser} from '@fortawesome/free-solid-svg-icons';
import AdminDashboard from "../components/administrator/Article/AdminDashboard";
import StyleDashboard from "../components/administrator/StetingStyle/StyleDashborad";

function AdministratorScreen() {
  const isLoggedIn = checkIfUserIsLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/administrator/auth');
    }
  }, [isLoggedIn, navigate]);

  const titleStyle: CSSProperties = {
    margin: '25px 0',
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  };

  return (
    <Box bg="#EEE6D8">
      <NavBarComponent/>
      <Box paddingTop={"100px"} minHeight={window.innerHeight - 300}>
        <h6 style={titleStyle}>Dashboard</h6>
        <Box style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            <ServiceCard name={'Manage Product'} color={'#F2C94C'} icon={faTshirt} callback={() => navigate('/administrator/Article')}></ServiceCard>
            <ServiceCard name={'Manage Profile'} color={'#DAAB3A'} icon={faUser} callback={() => navigate('/administrator/profile')}></ServiceCard>
            <ServiceCard name={'Manage Style'} color={'#D3821E'} icon={faPen} callback={() => navigate('/administrator/StetingStyle')}></ServiceCard>
            <ServiceCard name={'Manage Galleries'} color={'#B67332'} icon={faImages} callback={() => navigate('/administrator/galleries')}></ServiceCard>
            <ServiceCard name={'Manage Open Schedules'} color={'#93441A'} icon={faClock} callback={() => navigate('/administrator/schedule')}></ServiceCard>
        </Box>
      </Box>
      <MapSiteComponent/>
    </Box>
  )
}

export default AdministratorScreen;
