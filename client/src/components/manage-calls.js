import React, { useState } from "react";
import endpoint from "../config";
import { Link as ReachLink } from "@reach/router";
import {
  Button,
  Box,
  Heading,
  Grid,
  useColorMode,
  Text,
  Collapse,
  Flex,
  Link,
  Icon,
} from "@chakra-ui/core";

export const ManageCalls = () => {
  const [show, setShow] = useState(true);

  const { colorMode } = useColorMode();

  const items = JSON.parse(localStorage.getItem("mockmesecret")) || {};
  const mySessionKey = localStorage.getItem("mySessionKey") || "";

  return (
    <Box>
      {Object.keys(items).length > 0 ? (
        <Box p={10}>
          <Box
            p={10}
            bg={`mode.${colorMode}.box`}
            w="100%"
            borderWidth={colorMode === "light" ? "1px" : 0}
            rounded="lg"
            align="center"
            overflow="hidden"
          >
            <Flex>
              <Heading as="h3" color={`mode.${colorMode}.text`}>
                Your API calls:
              </Heading>
              <Button variantColor="teal" onClick={() => setShow(!show)} ml={5}>
                {show ? "Hide" : "Show"}
              </Button>
            </Flex>

            <Collapse mt={4} isOpen={show}>
              <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                {Object.entries(items).map(([call, json], index) => (
                  <Box
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    bg={colorMode === "light" ? "white" : "gray.600"}
                    borderColor={colorMode === "light" ? "white" : "gray.600"}
                    rounded="lg"
                    height="200"
                  >
                    <Heading as="h6" color={`mode.${colorMode}.text`}>
                      <Link as={ReachLink} to={`/edit/${call}`}>
                        Edit: {call} <Icon name="edit" size="5" />
                      </Link>
                    </Heading>
                    <Text mt={4} color={`mode.${colorMode}.text`}>
                      <span
                        style={{
                          display: "inline-block",
                          height: "50px",
                          overflow: "hidden",
                          borderBottom: "1px #ddd solid",
                          paddingBottom: "5px",
                        }}
                      >
                        {json}
                      </span>{" "}
                    </Text>
                    <Text color={`mode.${colorMode}.text`}>
                      <Link
                        href={`${endpoint.APP_URL}/app/${mySessionKey}/${call}`}
                        isExternal
                      >
                        Call Link <Icon name="external-link" size="4" />
                      </Link>
                    </Text>
                  </Box>
                ))}
              </Grid>
            </Collapse>
          </Box>
        </Box>
      ) : (
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
              No Mocks found
            </Heading>

            <Button as={ReachLink} to="/" variantColor="blue">
              Create your first mock here!
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
