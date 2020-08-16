import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Box, useColorMode, Flex } from "@chakra-ui/core";

const HowToUse = (_: RouteComponentProps) => {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Box
        p={10}
        as={Flex}
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Box
          p={10}
          bg={`mode.${colorMode}.box`}
          w="100%"
          borderWidth={colorMode === "light" ? "1px" : 0}
          rounded="lg"
          alignContent="center"
          overflow="hidden"
        >
          <Box textAlign="left">
            <pre>
              {`fetch('http://')
.then(res => res.json())
.then(res => console.log(res));`}
            </pre>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HowToUse;