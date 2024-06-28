import React from "react";
import {Box, Text, useColorModeValue} from "@chakra-ui/react";
import {Link} from "react-router-dom";

export default function HomeButtonComponent() {
  return (
    <Box width={'100%'}>
      <Link to={"/"} style={{display: "flex", alignItems: "center", textDecoration: "none"}}>
        <Text color={useColorModeValue("black", "white")} fontSize="xl">ProjectHub</Text>
      </Link>
    </Box>
  );
}
