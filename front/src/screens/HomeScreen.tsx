import React from "react";
import {Box} from '@chakra-ui/react';

import Nav from "../components/navigation/NavBarComponent";
import PartnersComponent from "../components/PartnersComponent";
import ContactComponent from "../components/ContactComponent";
import ShopComponent from "../components/ShopComponent"
import MapSiteComponent from "../components/MapSiteComponent";
import HomeComponent from "../components/HomeComponent";
import Avis from "../components/Avis";
import SocialNetworksComponent from "../components/SocialNetworksComponent";
import ScheduleComponent from "../components/ScheduleComponent";
import LoadingComponent from "../components/administrator/LoadingComponent";

import {I18nextProvider} from "react-i18next";
import i18n from "i18next";
import Carousel from "../components/CarouselComponent";
import ArticleList from "../components/Article/ArticleList";
import AdminDashboard from "../components/administrator/Article/AdminDashboard";
import ArticleScreen from "./ArticlesScreen";
import StyleDashboard from "../components/administrator/StetingStyle/StyleDashborad";

export default function HomeScreen() {
  return (
    <I18nextProvider i18n={i18n}>
      <Box>
        <Nav/>
        <LoadingComponent/>
        <HomeComponent/>
        <ScheduleComponent/>
        <Carousel/>
        <ArticleScreen />
        <PartnersComponent/>
        <ContactComponent/>
        <ShopComponent/>
        <Avis/>
        <SocialNetworksComponent/>
        <MapSiteComponent/>
      </Box>
    </I18nextProvider>
  );
}
