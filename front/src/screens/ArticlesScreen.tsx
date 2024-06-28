import React from "react";
import { Box } from '@chakra-ui/react';
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import ArticleList from "../components/Article/ArticleList";


const ArticleScreen: React.FC = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <Box>
                <ArticleList/>
            </Box>
        </I18nextProvider>
    );
}

export default ArticleScreen;
