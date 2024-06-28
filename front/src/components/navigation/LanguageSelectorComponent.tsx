import React, {useState} from 'react';
import {Box, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue} from '@chakra-ui/react';
import {FiChevronDown} from 'react-icons/fi';
// @ts-ignore
import frFlag from '../../assets/fr.svg';
// @ts-ignore
import enFlag from '../../assets/gb.svg';
import {useTranslation} from 'react-i18next';

function LanguageSelectorComponent() {
  const {i18n} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => console.log('Language Updated!'));
    setSelectedLanguage(lng);
  };

  const languageOptions = [
    {code: 'fr', label: "Français"},
    {code: 'en', label: "English"},
  ];

  const flagImageForSelectedLanguage = () => {
    switch (selectedLanguage) {
      case 'fr':
        return frFlag;
      case 'en':
        return enFlag;
      default:
        return frFlag;
    }
  };

  const selectedLanguageOption = languageOptions.find(
    (option) => option.code === selectedLanguage,
  );

  const selectedLanguageLabel: string = selectedLanguageOption ? selectedLanguageOption.label : "";

  return (
      <Box width={'auto'} border={'2px solid black'} padding={'8px'} alignItems={'center'} justifyContent={'center'} borderRadius={'20px'} marginX="2%">
        <Menu>
          <MenuButton >
            <Flex alignItems="center">
              <Image
                  src={flagImageForSelectedLanguage()}
                  alt={selectedLanguageLabel + " Flag"}
                  boxSize={6}
              />
              <Text
                  color={useColorModeValue("black", "white")}
                  fontSize="xl"
                  ml={2}
              >
                {window.innerWidth < 768
                    ? selectedLanguageLabel.length > 2
                        ? selectedLanguageLabel.substr(0, 2)
                        : selectedLanguageLabel
                    : selectedLanguageLabel}
              </Text>
              <FiChevronDown size={18}
                             color={useColorModeValue("black", "white")}
              />
            </Flex>
          </MenuButton>

          <MenuList  bg="#E5E7E6" style={{ border: "1px solid black", borderRadius: "5px", padding: "8px" }}>
            {languageOptions.map((option) => (
                <MenuItem
                    key={option.code}
                    bg="#E5E7E6"
                    onClick={() => changeLanguage(option.code)}
                >
                  {window.innerWidth < 768
                      ? option.label.length > 2
                          ? option.label.substr(0, 2)
                          : option.label
                      : option.label}
                </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
  );
}

export default LanguageSelectorComponent;
