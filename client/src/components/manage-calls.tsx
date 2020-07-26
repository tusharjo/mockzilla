import React, { useState } from "react";
import endpoint from "../config";
import { Link as ReachLink, RouteComponentProps } from "@reach/router";
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
  ButtonGroup,
} from "@chakra-ui/core";

export const ManageCalls = (_: RouteComponentProps) => {
  const [show, setShow] = useState(true);

  const { colorMode } = useColorMode();

  const items = JSON.parse(localStorage.getItem("mockmesecret") || "{}");
  const mySessionKey = localStorage.getItem("mySessionKey") || "";

  return (
    <Box>
      {Object.keys(items).length > 0 ? (
        <Box p={[4, 10]}>
          <Box
            p={[4, 10]}
            bg={`mode.${colorMode}.box`}
            w="100%"
            borderWidth={colorMode === "light" ? "1px" : 0}
            rounded="lg"
            alignContent="center"
            overflow="hidden"
          >
            <Flex>
              <Heading as="h3" color={`mode.${colorMode}.text`}>
                Your API calls:
              </Heading>
              <ButtonGroup spacing={4} ml={5}>
                <Button leftIcon="arrow-back" variantColor="teal" mb={[4, 0]}>
                  <ReachLink to="/">Go Back</ReachLink>
                </Button>
                <Button variantColor="teal" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </ButtonGroup>
            </Flex>

            <Collapse mt={4} isOpen={show}>
              <Grid
                templateColumns={["repeat(1, 1fr)", "repeat(4, 23%)"]}
                gap={6}
              >
                {Object.entries(items).map(([call, { httpStatus, json }]: any, index) => (
                  <Box
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    bg={colorMode === "light" ? "white" : "gray.600"}
                    borderColor={colorMode === "light" ? "white" : "gray.600"}
                    rounded="lg"
                    height="200"
                    key={index}
                  >
                    <Heading as="h6" color={`mode.${colorMode}.text`}>
                      <ReachLink to={`/edit/${call}`}>
                        Edit: {call} <Icon name="edit" size="5" />
                      </ReachLink>
                    </Heading>
                    <Text mt={4} color={`mode.${colorMode}.text`}>
                      <span
                        style={{
                          display: "inline-block",
                          height: "50px",
                          overflow: "hidden",
                          borderBottom: "1px #ddd solid",
                          paddingBottom: "5px",
                          width: "100%",
                        }}
                      >
                        {json}
                      </span>{" "}
                    </Text>
                    <Box as={Flex} alignItems="center" mt={2} justifyContent="space-between">
                      <Box as={Flex} alignItems="center" >
                        <Icon name="info" size="14px" color="green.400" mr={1} />
                        <Text fontSize="14px" color={`mode.${colorMode}.text`} mr={1}>HTTP Status:</Text>
                        <Text color={`mode.${colorMode}.text`} fontWeight={600} fontSize="14px">{httpStatus}</Text>
                      </Box>

                      <Text color={`mode.${colorMode}.text`} fontSize="14px">
                        <Link
                          href={`${endpoint.APP_URL}/app/${mySessionKey}/${call}`}
                          isExternal
                        >
                          Call Link <Icon name="external-link" size="4" />
                        </Link>
                      </Text>
                    </Box>
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
              alignContent="center"
              overflow="hidden"
            >
              <Heading color={`mode.${colorMode}.text`} mb={10}>
                No Mocks found
            </Heading>

              <Button variantColor="blue">
                <ReachLink to="/">Create your first mock here!</ReachLink>
              </Button>
            </Box>
          </Box>
        )}
    </Box>
  );
};
