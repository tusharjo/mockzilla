import React, { useContext } from "react";
import { Link as ReachLink } from "@reach/router";
import { StorageContext } from "./localStorageContext";
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
  const { apiStore } = useContext(StorageContext);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={["1rem", "1.5rem 3rem"]}
      bg="teal.500"
      color="white"
      position="sticky"
      top={0}
      zIndex={2}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="xl" position="relative" ml="10px">
          <ReachLink to="/"><span style={{ fontWeight: "300", marginRight: "8px", position: "absolute", top: "-10px", fontSize: "48px", left: "-20px" } as any}>&#123;</span >MockME<span style={{ fontWeight: "300", marginLeft: "8px", position: "absolute", top: "-10px", fontSize: "48px", right: "-20px" } as any}>&#125;</span></ReachLink>
        </Heading>
      </Flex>

      <Box>
        {Object.keys(apiStore).length > 0 && (
          <Box display={["none", "inline-flex"]}>
            <ReachLink to="/manage">
              <Button variantColor="pink">Manage My Mocks</Button>
            </ReachLink>
          </Box>
        )}
        <Button aria-label="Light/Dark mode" onClick={toggleColorMode} bg="transparent">
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
