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
import ReactJson from "react-json-view";
import { navigate } from "@reach/router";

const handleUpdate = (jsondata, appid, toast) => {
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
  toast({
    position: "bottom-left",
    title: "Updated JSON",
    description: "JSON value has been updated",
    status: "success",
    duration: 2000,
    isClosable: true,
  });
  navigate("/manage");
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
    navigate("/manage");
  });
};

export const Edit = (props) => {
  const [editMode, setEditMode] = useState(false);
  const getLocalStorage =
    JSON.parse(localStorage.getItem("mockmesecret")) || {};
  const mySessionKey = localStorage.getItem("mySessionKey") || "";

  const { colorMode } = useColorMode();
  const toast = useToast();

  const [jsondata, setJsonData] = useState(getLocalStorage[props.appid] || "");

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

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
              {editMode && isJson(jsondata) ? (
                <ReactJson
                  src={JSON.parse(jsondata)}
                  theme={colorMode === "light" ? "bright:inverted" : "bright"}
                  onEdit={({ updated_src }) =>
                    setJsonData(JSON.stringify(updated_src))
                  }
                  onDelete={({ updated_src }) =>
                    setJsonData(JSON.stringify(updated_src))
                  }
                  onAdd={({ updated_src }) =>
                    setJsonData(JSON.stringify(updated_src))
                  }
                ></ReactJson>
              ) : (
                <Textarea
                  minHeight="400px"
                  onChange={(e) => setJsonData(e.target.value)}
                  value={
                    isJson(jsondata)
                      ? JSON.stringify(JSON.parse(jsondata), null, 2)
                      : jsondata
                  }
                  color={`mode.${colorMode}.text`}
                  whiteSpace="pre"
                ></Textarea>
              )}
            </FormControl>{" "}
            <Text as="span" mr={3} color={`mode.${colorMode}.text`}>
              Edit in:
            </Text>
            <Tooltip
              placement="bottom"
              hasArrow
              label={`Edit JSON in ${
                editMode && isJson(jsondata) ? "Normal" : "Tree"
              } Mode`}
            >
              <Button
                variantColor="teal"
                rightIcon="edit"
                onClick={() => setEditMode(!editMode)}
                mr={5}
              >
                {editMode ? "Normal" : "JSON Tree"} Mode
              </Button>
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
              onClick={() => handleUpdate(jsondata, props.appid, toast)}
            >
              Update JSON
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
