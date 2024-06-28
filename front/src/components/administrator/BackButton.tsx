import React from 'react';
import {Box, Text} from '@chakra-ui/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
      <Box style={{ width: '125px', marginLeft: '50px' }} onClick={() => navigate('/administrator')}>
          <button className="buttonStyle" style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <FontAwesomeIcon color='#DAAB3A' style={{ marginTop: 'auto', marginBottom: 'auto' }} icon={faArrowLeft} />
              <Text color='#DAAB3A'>Back</Text>
          </button>
      </Box>
  )
}

export default BackButton;
