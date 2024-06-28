import React, { CSSProperties, useEffect, useState } from "react";
import { Box, Center, Container } from '@chakra-ui/react';
import NavBarComponent from '../components/navigation/NavBarComponent';
import MapSiteComponent from '../components/MapSiteComponent';
import { useNavigate } from 'react-router-dom';
import "../theme/index.css"
import BackButton from '../components/administrator/BackButton';
import axios from 'axios';
import ScheduleDay from '../components/administrator/schedule/ScheduleDay';

export interface IScheduleDay {
  day: string;
  openMorning: string;
  closeMorning: string;
  openAfternoon: string;
  closeAfternoon: string;
  closed: boolean;
}

function ScheduleScreen() {
  useNavigate();
  const [schedules, setSchedules] = useState<IScheduleDay[] | null>(null);

  async function getSchedules() {
    try {
      const response = await axios.get('/api/schedules');
      setSchedules(response.data);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    getSchedules().then(r => console.warn(r));
  }, []);

  const titleStyle: CSSProperties = {
    margin: '25px 0',
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  };

  return (
      <Container maxW="container.xl" padding="0">
        <NavBarComponent />
        <Box bg="#EEE6D8" paddingTop={{ base: "100px", md: "50px" }} minHeight={window.innerHeight - 300}>
          <BackButton />
          <h6 style={titleStyle}>Manage Schedule</h6>
          <Box>
            {schedules && schedules.map((period, index) => (
                <div key={index}>
                  <Center><ScheduleDay hours={period} /></Center>
                </div>
            ))}
          </Box>
        </Box>
        <MapSiteComponent />
      </Container>
  )
}

export default ScheduleScreen;
