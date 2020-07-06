import React from "react";
import { Link as ReachLink } from "@reach/router";
import { Button, Box, Heading, useColorMode, Flex } from "@chakra-ui/core";

export const NotFound = () => {
  const { colorMode } = useColorMode();

  const items = JSON.parse(localStorage.getItem("mockmesecret")) || {};

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
          align="center"
          overflow="hidden"
        >
          <Heading color={`mode.${colorMode}.text`} mb={10}>
            Sorry, the page which you've been looking for does not exist!
          </Heading>
          {Object.keys(items).length > 0 ? (
            <Button as={ReachLink} to="/manage" variantColor="blue">
              Manage My Mocks
            </Button>
          ) : (
            <Button as={ReachLink} to="/" variantColor="blue">
              Create your first mock here!
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
