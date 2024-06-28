import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Table, Tbody, Td, Tr, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';

interface ScheduleComponentStyleProps {
    containerBgColor: string;
    textColor: string;
    hoverTextColor: string;
    tableBgColor: string;
    tableBorderColor: string;
    tableBoxShadow: string;
    closedTextColor: string;
    titleFontSize: { base: string, md: string };
    titleHoverScale: string;
    titleAfterHeight: string;
    titleAfterBgColor: string;
}

const defaultScheduleComponentStyleProps: ScheduleComponentStyleProps = {
    containerBgColor: "#EEE6D8",
    textColor: "black",
    hoverTextColor: "black",
    tableBgColor: "#D3D3D3",
    tableBorderColor: "black",
    tableBoxShadow: "md",
    closedTextColor: "red.500",
    titleFontSize: { base: '4xl', md: '6xl' },
    titleHoverScale: 'scale(1.1)',
    titleAfterHeight: '1px',
    titleAfterBgColor: 'black',
};

interface StoreHoursProps {
    hours: {
        days: string;
        morning: { open: string; close: string };
        afternoon: { open: string; close: string };
        closed: boolean;
    }[];
    styleProps: ScheduleComponentStyleProps;
}

const ScheduleComponent: React.FC<{ styleProps?: ScheduleComponentStyleProps }> = ({ styleProps = defaultScheduleComponentStyleProps }) => {
    const { t } = useTranslation();
    const [currentStyleProps, setCurrentStyleProps] = useState<ScheduleComponentStyleProps>(styleProps);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/schedulestyle');
                if (response.data) {
                    setCurrentStyleProps(response.data);
                }
            } catch (error) {
                console.error("Error fetching schedule component style", error);
            }
        };
        fetchData();
    }, []);

    const fade = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 },
    });

    const storeHours = [
        { days: 'monday', morning: { open: "openMorning", close: "closeMorning" }, afternoon: { open: "openAfternoon", close: "closeAfternoon" }, closed: false },
        { days: "tuesday", morning: { open: "openMorning", close: "closeMorning" }, afternoon: { open: "openAfternoon", close: "closeAfternoon" }, closed: false },
        { days: "wednesday", morning: { open: "openMorning", close: "closeMorning" }, afternoon: { open: "openAfternoon", close: "closeAfternoon" }, closed: false },
        { days: "thursday", morning: { open: "openMorning", close: "closeMorning" }, afternoon: { open: "openAfternoon", close: "closeAfternoon" }, closed: false },
        { days: "friday", morning: { open: "openMorning", close: "closeMorning" }, afternoon: { open: "openAfternoon", close: "closeAfternoon" }, closed: false },
        { days: "saturday", morning: { open: "openMorning", close: "closeMorning" }, afternoon: { open: "openSAfternoon", close: "closeSAfternoon" }, closed: false },
        { days: "sunday", morning: { open: "", close: "" }, afternoon: { open: "", close: "" }, closed: true },
    ];

    const StoreHours: React.FC<StoreHoursProps> = ({ hours, styleProps }) => {
        return (
            <animated.div style={fade}>
                <Box p={4} borderWidth="1px" borderRadius="xl" mb={4} bg={styleProps.tableBgColor} boxShadow={styleProps.tableBoxShadow} borderColor={styleProps.tableBorderColor}>
                    <Table variant="simple">
                        <Tbody>
                            {hours.map((period, index) => (
                                <Tr key={index}>
                                    <Td>{t(period.days)}</Td>
                                    <Td>
                                        {period.closed ? (
                                            <Text></Text>
                                        ) : (
                                            `${t(period.morning.open)} - ${t(period.morning.close)}`
                                        )}
                                    </Td>
                                    <Td>
                                        {period.closed ? (
                                            <Text color={styleProps.closedTextColor}>{t('Closed')}</Text>
                                        ) : (
                                            `${t(period.afternoon.open)} - ${t(period.afternoon.close)}`
                                        )}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </animated.div>
        );
    };

    return (
        <Flex id="Services" direction="column" align="center" justify="center" bg={currentStyleProps.containerBgColor}>
            <Box textAlign="center" p={4} rounded="md" maxW="1000px" mx="auto">
                <Text fontSize={currentStyleProps.titleFontSize} textAlign="center" color={currentStyleProps.textColor}
                      position="relative" transition="transform 0.3s, font-size 0.3s" _hover={{ transform: currentStyleProps.titleHoverScale, _after: { width: '100%' } }}
                      _after={{ content: '""', position: 'absolute', width: '0', height: currentStyleProps.titleAfterHeight, bottom: '-5px', left: '0', backgroundColor: currentStyleProps.titleAfterBgColor, transition: 'width 0.420s ease-in-out' }}
                      marginBottom={5}>
                    {t('schedule')}
                </Text>
                <StoreHours hours={storeHours} styleProps={currentStyleProps}></StoreHours>
            </Box>
        </Flex>
    );
};

export default ScheduleComponent;
