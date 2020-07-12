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
import { navigate, RouteComponentProps } from "@reach/router";

const handleUpdate = (jsondata: "", appid: number, toast: any) => {
  const url = `${endpoint.APP_URL}/app-update`;
  const body = {
    jsondata,
    callid: appid,
  };
  api(url, "POST", body).then((res: any) => {
    let { call, json } = res;
    let oldItems = JSON.parse(localStorage.getItem("mockmesecret") || "{}");
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

const handleDelete = (appid: number, toast: any) => {
  const url = `${endpoint.APP_URL}/app-delete`;
  const body = {
    callid: appid,
  };
  api(url, "POST", body).then((res: any) => {
    let { call } = res;
    let oldItems = JSON.parse(localStorage.getItem("mockmesecret") || "{}");

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

type Props = {
  appid: number;
};

export const Edit: RouteComponentProps & any = ({ appid }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const getLocalStorage = JSON.parse(
    localStorage.getItem("mockmesecret") || "{}"
  );
  const mySessionKey = localStorage.getItem("mySessionKey") || "";

  const { colorMode } = useColorMode();
  const toast = useToast();

  const [jsondata, setJsonData] = useState(getLocalStorage[appid] || "");

  function isJson(str: string) {
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
          alignContent="center"
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
                  onChange={(e: any) => setJsonData(e.target.value)}
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
              aria-label="Mode"
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
            <Tooltip
              aria-label="Delete"
              placement="bottom"
              hasArrow
              label="Delete this mock"
            >
              <IconButton
                variantColor="red"
                aria-label="Call Segun"
                icon="delete"
                onClick={() => handleDelete(appid, toast)}
                mr={5}
              />
            </Tooltip>
            <Tooltip
              aria-label="Link"
              placement="bottom"
              hasArrow
              label="Link to JSON mock"
            >
              <IconButton
                aria-label="Link"
                icon="external-link"
                as={Link}
                variantColor="blue"
                mr={5}
              >
                <Link
                  href={`${endpoint.APP_URL}/app/${mySessionKey}/${appid}`}
                  isExternal
                >
                  Call Link
                </Link>
              </IconButton>
            </Tooltip>
            <Button
              rightIcon="arrow-forward"
              mt={[4, 0]}
              variantColor="green"
              onClick={() => handleUpdate(jsondata, appid, toast)}
            >
              Update JSON
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
