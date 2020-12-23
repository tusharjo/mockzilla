import React, { useState } from "react";
import endpoint from "../config";
import { Link as ReachLink, RouteComponentProps } from "@reach/router";
import { useStorage } from "./common/localStorageContext";
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
  useClipboard
} from "@chakra-ui/core";

const CopyToClipBoard = ({ copyValue }: { copyValue: string }) => {
  const value = useState(copyValue);
  const { onCopy, hasCopied } = useClipboard(value[0]);
  return <>
    <Button variantColor={hasCopied ? "teal" : "blue"} size="xs" onClick={onCopy}>
      {hasCopied ? "Copied!" : <span><Icon name="copy" mr={1} />Copy URL</span>}
    </Button>
  </>
}

const ManageCalls = (_: RouteComponentProps) => {
  const [show, setShow] = useState(true);
  const { apiStore, mockmeSessionKey } = useStorage();
  const { colorMode } = useColorMode();
  return (
    <Box>
      {Object.keys(apiStore).length > 0 ? (
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
                {Object.entries(apiStore).map(([call, { httpStatus, json, newEndpoint }]: any, index) => (
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
                    <Flex alignItems="center" justifyContent="space-between">
                      <Heading as="h6" color={`mode.${colorMode}.text`}>
                        <ReachLink to={`/edit/${call}`}>
                          Edit: {call} <Icon name="edit" size="5" />
                        </ReachLink>
                      </Heading>
                      <CopyToClipBoard copyValue={newEndpoint ? `${endpoint.COPY_URL}/custom/${newEndpoint}` : `${endpoint.COPY_URL}/app/${mockmeSessionKey}/${call}`} />
                    </Flex>
                    <Text mt={4} color={`mode.${colorMode}.text`}>
                      <Text mb={2} fontSize="11px" fontWeight="300" letterSpacing="1px" color={`mode.${colorMode}.text`} textTransform="uppercase">Preview:</Text>
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
                          href={newEndpoint ? `${endpoint.COPY_URL}/custom/${newEndpoint}` : `${endpoint.COPY_URL}/app/${mockmeSessionKey}/${call}`}
                          isExternal
                        >
                          Visit Call Link <Icon name="external-link" size="4" />
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

export default ManageCalls;