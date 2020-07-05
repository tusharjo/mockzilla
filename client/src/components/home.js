import React, { useState } from "react";
import endpoint from "../config";
import { Link as ReachLink } from "@reach/router";
import { api } from "../api";
import {
  Button,
  Box,
  Heading,
  Divider,
  useColorMode,
  Textarea,
  Text,
  Input,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Link,
  useToast,
} from "@chakra-ui/core";

export const Home = () => {
  const [type, setType] = useState("get");
  const toast = useToast();

  const [jsondata, setJsonData] = useState("");
  const { colorMode } = useColorMode();
  const [fetchJSONinput, setFetchJSON] = useState("");

  const [, setItems] = useState(
    JSON.parse(localStorage.getItem("mockmesecret")) || {}
  );
  const mySessionKey = localStorage.getItem("mySessionKey") || "";

  const getToken = () => {
    if (!mySessionKey) {
      const url = `${endpoint.APP_URL}/token`;
      api(url, "GET").then((res) => {
        localStorage.setItem("mySessionKey", res.token);
      });
    }
  };

  getToken();

  const fetchJSON = () => {
    if (fetchJSONinput) {
      const url = `${endpoint.APP_URL}/app-fetch`;
      const body = {
        fetchurl: fetchJSONinput,
      };
      api(url, "POST", body).then((res) => {
        let { call, json, error = "" } = res;
        let oldItems = JSON.parse(localStorage.getItem("mockmesecret"));
        localStorage.setItem(
          "mockmesecret",
          JSON.stringify({
            ...oldItems,
            [call]: JSON.stringify(json),
          })
        );
        setItems(JSON.parse(localStorage.getItem("mockmesecret")));

        if (error) {
          toast({
            position: "bottom-left",
            title: "Incorrect JSON format",
            description: "Please enter proper JSON",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            position: "bottom-left",
            title: "API created",
            description: (
              <Link as={ReachLink} to="/manage">
                Click here to manage your calls
              </Link>
            ),
            status: "success",
            duration: 8000,
            isClosable: true,
          });
        }
        setFetchJSON("");
      });
    } else {
      toast({
        position: "bottom-left",
        title: "Failed to fetch URL",
        description: "Please enter proper URL",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handSubmit = () => {
    if (jsondata) {
      const url = `${endpoint.APP_URL}/app-submit`;
      const body = {
        jsondata,
        type,
      };
      api(url, "POST", body).then((res) => {
        let { call, json } = res;
        let oldItems = JSON.parse(localStorage.getItem("mockmesecret"));
        localStorage.setItem(
          "mockmesecret",
          JSON.stringify({
            ...oldItems,
            [call]: json,
          })
        );
        setItems(JSON.parse(localStorage.getItem("mockmesecret")));
        setJsonData("");
        toast({
          position: "bottom-left",
          title: "API created",
          description: (
            <Link as={ReachLink} to="/manage">
              Click here to manage your calls
            </Link>
          ),
          status: "success",
          duration: 8000,
          isClosable: true,
        });
      });
    } else {
      toast({
        position: "bottom-left",
        title: "Failed to create API",
        description: "Please enter proper JSON value",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Box
        p={10}
        bg={colorMode === "light" ? "blue.100" : "gray.700"}
        w="100%"
        align="center"
        overflow="hidden"
      >
        <Heading mb={4} as="h1">
          <Text color={`mode.${colorMode}.text`} fontWeight="400">
            <span style={{ fontWeight: "600" }}>Mock &amp; Store</span> your own
            API call!
          </Text>
        </Heading>

        <Button size="lg" variantColor="teal" mt="24px">
          Find Out More!
        </Button>
      </Box>

      <Flex p={10}>
        <Box
          p={10}
          bg={`mode.${colorMode}.box`}
          w="100%"
          borderWidth={colorMode === "light" ? "1px" : 0}
          rounded="lg"
          align="center"
          overflow="hidden"
        >
          <Heading as="h2" mb={4} color={`mode.${colorMode}.text`}>
            Create your own JSON
          </Heading>

          <form>
            <FormControl mb={4}>
              <FormLabel htmlFor="type" color={`mode.${colorMode}.text`}>
                Type:
              </FormLabel>
              <Select
                id="type"
                defaultValue="GET"
                onChange={(e) => setType(e.target.value)}
              >
                <option>GET</option>
                <option>POST</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel color={`mode.${colorMode}.text`}>JSON:</FormLabel>
              <Textarea
                onChange={(e) => setJsonData(e.target.value)}
                value={jsondata}
                color={`mode.${colorMode}.text`}
                // isInvalid={!jsondata}
                size="sm"
              ></Textarea>
            </FormControl>

            <Button
              variantColor="teal"
              mt={4}
              type="button"
              onClick={() => handSubmit()}
            >
              Submit
            </Button>
          </form>
        </Box>
        <Divider orientation="vertical" margin="0 40px" />
        <Box w="90%">
          <Box
            p={10}
            bg={`mode.${colorMode}.box`}
            borderWidth={colorMode === "light" ? "1px" : 0}
            rounded="lg"
            align="center"
            overflow="hidden"
          >
            <Heading as="h3" mb={4} color={`mode.${colorMode}.text`}>
              Fetch from an external endpoint
            </Heading>
            <form>
              <FormControl>
                <FormLabel color={`mode.${colorMode}.text`}>URL:</FormLabel>
                <Input
                  onChange={(e) => setFetchJSON(e.target.value)}
                  color={`mode.${colorMode}.text`}
                  value={fetchJSONinput}
                />
              </FormControl>

              <Button
                mt={4}
                variantColor="teal"
                type="button"
                onClick={() => fetchJSON()}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
