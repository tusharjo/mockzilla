import React, { useState } from "react";
import endpoint from "../config";
import { navigate } from "@reach/router";
import { api } from "../api";
import { Button, Form, Container } from "react-bootstrap";

const handleUpdate = (jsondata, appid, readState, setReadState) => {
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
  }
};

const handleDelete = (appid) => {
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
    navigate("/");
  });
};

export const Edit = (props) => {
  const [readState, setReadState] = useState(true);
  const getLocalStorage =
    JSON.parse(localStorage.getItem("mockmesecret")) || {};
  const [jsondata, setJsonData] = useState(getLocalStorage[props.appid] || "");

  return (
    <Container>
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Edit JSON response:</Form.Label>
          <Form.Control
            as="textarea"
            rows="10"
            onChange={(e) => setJsonData(e.target.value)}
            value={jsondata}
            readOnly={readState}
          />
        </Form.Group>
        <Button
          variant="info"
          type="button"
          onClick={() => setReadState(!readState)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          type="button"
          onClick={() => handleDelete(props.appid)}
          style={{ margin: "0 15px" }}
        >
          Delete
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={() =>
            handleUpdate(jsondata, props.appid, readState, setReadState)
          }
        >
          Update JSON
        </Button>
      </Form>
    </Container>
  );
};
