import React from "react";
import { Link as ReachLink } from "@reach/router";
import {
  Box,
  Heading,
  Flex,
  Button,
  useColorMode,
  Icon,
} from "@chakra-ui/core";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const items = JSON.parse(localStorage.getItem("mockmesecret") || "{}");
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={["1rem", "1.5rem 3rem"]}
      bg="teal.500"
      // bg={colorMode === "light" ? "teal.500" : "gray.900"}
      color="white"
      position="sticky"
      top={0}
      zIndex={1}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="xl">
          <ReachLink to="/">MockME &lt;/&gt;</ReachLink>
        </Heading>
      </Flex>

      <Box>
        {Object.keys(items).length > 0 && (
          <Box display={["none", "inline-flex"]}>
            <ReachLink to="/manage">
              <Button variantColor="pink">Manage My Mocks</Button>
            </ReachLink>
          </Box>
        )}
        <Button onClick={toggleColorMode} bg="transparent">
          <Icon
            name={colorMode === "light" ? "moon" : "sun"}
            size="32px"
            color="white"
            style={{ cursor: "pointer" }}
          />
        </Button>
      </Box>
    </Flex>
  );
};
