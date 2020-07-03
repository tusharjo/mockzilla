import React, { useState } from "react";
import endpoint from "../config";
import { Link } from "@reach/router";
import { api } from "../api";
import {
  Button,
  Form,
  Col,
  Table,
  Jumbotron,
  Container,
} from "react-bootstrap";

export const Home = () => {
  const [type, setType] = useState("get");
  const [jsondata, setJsonData] = useState("");
  const [fetchJSONinput, setFetchJSON] = useState("");
  const [items, setItems] = useState(
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
        let { call, json } = res;
        let oldItems = JSON.parse(localStorage.getItem("mockmesecret"));
        localStorage.setItem(
          "mockmesecret",
          JSON.stringify({
            ...oldItems,
            [call]: JSON.stringify(json),
          })
        );
        setItems(JSON.parse(localStorage.getItem("mockmesecret")));
        setFetchJSON("");
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
      });
    }
  };

  return (
    <Container>
      <Jumbotron style={{ marginTop: "100px" }}>
        <h2 style={{ marginBottom: "20px" }}>
          <span style={{ fontWeight: "600" }}>Create &amp; Host</span> your own
          API call with just a click!
        </h2>
        <p>
          <Button variant="success" type="button">
            Find Out More!
          </Button>
        </p>
      </Jumbotron>

      {Object.keys(items).length > 0 && (
        <>
          <h3>Your API calls:</h3>
          <Table striped bordered hover>
            <tr>
              <th>Call actions</th>
              <th>JSON preview</th>
              <th>Call link</th>
            </tr>
            {Object.entries(items).map(([call, json], index) => (
              <tr key={index}>
                <td>
                  <Link to={`edit/${call}`}>{call}</Link>
                </td>{" "}
                <td width="100">
                  <span
                    style={{
                      width: "300px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      display: "inline-block",
                      whiteSpace: "pre",
                    }}
                  >
                    {json}
                  </span>{" "}
                </td>
                <td>
                  <a
                    href={`${endpoint.APP_URL}/app/${mySessionKey}/${call}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                </td>
              </tr>
            ))}
          </Table>
        </>
      )}
      <br />
      <hr />
      <br />
      <h3>Create your own JSON</h3>
      <br />
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Type:</Form.Label>
            <Form.Control
              as="select"
              defaultValue="GET"
              onChange={(e) => setType(e.target.value)}
            >
              <option>GET</option>
              <option>POST</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>JSON:</Form.Label>
          <Form.Control
            as="textarea"
            rows="8"
            onChange={(e) => setJsonData(e.target.value)}
            value={jsondata}
            required
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={() => handSubmit()}>
          Submit
        </Button>
      </Form>
      <br />
      <hr />
      <br />
      <h3>Fetch and host from an external endpoint</h3>
      <br />
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>URL:</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => setFetchJSON(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="button" onClick={() => fetchJSON()}>
          Submit
        </Button>
      </Form>
      <br />
    </Container>
  );
};
