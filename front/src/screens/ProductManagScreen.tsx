import React, {CSSProperties, useEffect, useRef} from "react";
import {Box} from '@chakra-ui/react';
import NavBarComponent from '../components/navigation/NavBarComponent';
import MapSiteComponent from '../components/MapSiteComponent';
import {checkIfUserIsLoggedIn} from '../components/LoginComponent';
import {useNavigate} from 'react-router-dom';
import "../theme/index.css"
import BackButton from '../components/administrator/BackButton';
import axios from 'axios';
import {getAuthorizedHeader} from '../common/auth';
import AdminDashboard from "../components/administrator/Article/AdminDashboard";


function ProductManagScreen() {
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
        <Box>
            <NavBarComponent/>
            <Box paddingTop={"100px"} minHeight={window.innerHeight - 300}>
                <BackButton/>
                <AdminDashboard/>
            </Box>
            <MapSiteComponent/>
        </Box>
    )
}

export default ProductManagScreen;
