import React, { useState } from 'react';
import { Box, Heading, Flex, Button, Text } from '@chakra-ui/react';
import CustomTimePicker from './CustomTimePicker';
import { IScheduleDay } from '../../../screens/ScheduleScreen';
import '../../../theme/index.css';

function ScheduleDay(props: { hours: IScheduleDay }) {
  const [openMorning, setOpenMorning] = useState<string | null>(props.hours.openMorning);
  const [closeMorning] = useState(props.hours.closeMorning);
  const [openAfternoon] = useState(props.hours.openAfternoon);
  const [closeAfternoon] = useState(props.hours.closeAfternoon);

  const handleSave = () => {
    console.log('Horaires enregistrés !');
  };

  const onChange = (value: string) => {
    setOpenMorning(value);
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
      <Box
          border="1px solid #ccc"
          borderRadius="md"
          width={['100%', '60%']}
          p="4"
          marginY="2%"
          bg="#B67332"
      >
        <Flex
            flexDirection={['column', 'column', 'row']}
            alignItems={['center', 'center']}
            justifyContent={['center', 'space-between']}
            width="100%"
        >
          <Heading as="h2" size="lg" minWidth={['100%', '175px']}>
            {capitalizeFirstLetter(props.hours.day)}
          </Heading>
          <Flex
              flexDirection="column"
              alignItems={['center', 'center']}
              justifyContent="center"
              width="100%"
              mt={[2, 2, 0]}
          >
            <Text fontSize="md" fontWeight="bold">
              Morning :
            </Text>
            <CustomTimePicker value={openMorning} onChange={onChange} />
            <CustomTimePicker value={closeMorning} onChange={onChange} />
          </Flex>
          <Flex
              flexDirection="column"
              alignItems={['center', 'center']}
              justifyContent="center"
              mt={[2, 2, 0]}
          >
            <Text fontSize="md" fontWeight="bold">
              Afternoon :
            </Text>
            <CustomTimePicker value={openAfternoon} onChange={onChange} />
            <CustomTimePicker value={closeAfternoon} onChange={onChange} />
          </Flex>
          <Box width={['100%', '125px']} mt={[2, 2, 0]}>
            <Button bg="#E5E7E6" className={'buttonStyle'} onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Flex>
      </Box>
  );
}

export default ScheduleDay;
