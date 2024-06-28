import * as React from 'react';
import {FiSun, FiMoon} from 'react-icons/fi';
import {useColorMode} from '@chakra-ui/react';
import {motion} from 'framer-motion';

export default function DarkModeComponent() {
  const {colorMode, toggleColorMode} = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const handleToggle = () => {
    toggleColorMode();
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{scale: 1.1}}
      whileTap={{scale: 0.9}}
    >
      {isDarkMode ? <FiSun size={24}/> : <FiMoon size={24}/>}
    </motion.button>
  );
}
