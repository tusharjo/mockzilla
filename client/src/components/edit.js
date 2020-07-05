import React, { useState } from "react";
import endpoint from "../config";
import { api } from "../api";
import {
  Button,
  Box,
  Heading,
  useColorMode,
  Textarea,
  Text,
  FormControl,
  IconButton,
  useToast,
  Link,
  Tooltip,
} from "@chakra-ui/core";

const handleUpdate = (jsondata, appid, readState, setReadState, toast) => {
  if (!readState) {
    const url = `${endpoint.APP_URL}/app-update`;
    const body = {
      jsondata,
      callid: appid,
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
    });
    setReadState(true);
    toast({
      position: "bottom-left",
      title: "Updated JSON",
      description: "JSON value has been updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    window.history.back();
  } else {
    toast({
      position: "bottom-left",
      title: "Invalid JSON",
      description: "Cannot update HTML values or blank values",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  }
};

const handleDelete = (appid, toast) => {
  const url = `${endpoint.APP_URL}/app-delete`;
  const body = {
    callid: appid,
  };
  api(url, "POST", body).then((res) => {
    let { call } = res;
    let oldItems = JSON.parse(localStorage.getItem("mockmesecret"));

    delete oldItems[call];
    localStorage.setItem(
      "mockmesecret",
      JSON.stringify({
        ...oldItems,
      })
    );
    toast({
      position: "bottom-left",
      title: "Deleted API",
      description: "API has been deleted successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    window.history.back();
  });
};

export const Edit = (props) => {
  const [readState, setReadState] = useState(true);
  const getLocalStorage =
    JSON.parse(localStorage.getItem("mockmesecret")) || {};
  const mySessionKey = localStorage.getItem("mySessionKey") || "";

  const { colorMode } = useColorMode();
  const toast = useToast();

  const [jsondata, setJsonData] = useState(getLocalStorage[props.appid] || "");

  return (
    <Box>
      <Box p={[4, 10]}>
        <Box
          p={[4, 10]}
          bg={`mode.${colorMode}.box`}
          w="100%"
          borderWidth={colorMode === "light" ? "1px" : 0}
          rounded="lg"
          align="center"
          overflow="hidden"
        >
          <Heading mb={4} as="h1">
            <Text color={`mode.${colorMode}.text`} fontWeight="400">
              Edit JSON response:
            </Text>
          </Heading>

          <form>
            <FormControl mb={4}>
              <Textarea
                rows="10"
                onChange={(e) => setJsonData(e.target.value)}
                value={jsondata}
                readOnly={readState}
                color={`mode.${colorMode}.text`}
                whiteSpace="pre"
              ></Textarea>
            </FormControl>

            <Tooltip placement="bottom" hasArrow label="Edit JSON">
              <IconButton
                variantColor="teal"
                aria-label="Call Segun"
                icon="edit"
                onClick={() => setReadState(!readState)}
                mr={5}
              />
            </Tooltip>
            <Tooltip placement="bottom" hasArrow label="Delete this mock">
              <IconButton
                variantColor="red"
                aria-label="Call Segun"
                icon="delete"
                onClick={() => handleDelete(props.appid, toast)}
                mr={5}
              />
            </Tooltip>
            <Tooltip placement="bottom" hasArrow label="Link to JSON mock">
              <IconButton
                icon="external-link"
                href={`${endpoint.APP_URL}/app/${mySessionKey}/${props.appid}`}
                as={Link}
                target="_blank"
                rel="noopener nofollow"
                variantColor="blue"
                mr={5}
              >
                Call Link
              </IconButton>
            </Tooltip>
            <Button
              rightIcon="arrow-forward"
              mt={[4, 0]}
              variantColor="green"
              onClick={() =>
                handleUpdate(
                  jsondata,
                  props.appid,
                  readState,
                  setReadState,
                  toast
                )
              }
            >
              Update JSON
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
