import React, { useState } from "react";
import endpoint from "../config";
import { Link } from "@reach/router";
import { api } from "../api";

export const Home = () => {
  const [type, setType] = useState("get");
  const [jsondata, setJsonData] = useState("");
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

  const handSubmit = () => {
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
  };

  return (
    <div>
      <div>
        {Object.entries(items).map(([call, json], index) => (
          <div key={index}>
            <span>
              <Link to={`edit/${call}`}>{call}</Link>
            </span>{" "}
            <span>{json}</span>{" "}
            <a
              href={`${endpoint.APP_URL}/app/${mySessionKey}/${call}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Call Link
            </a>
          </div>
        ))}
      </div>
      <form>
        <select onChange={(e) => setType(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
        </select>
        <br />
        <br />
        <textarea
          onChange={(e) => setJsonData(e.target.value)}
          value={jsondata}
          required
        />
        <br />
        <br />
        <button type="button" onClick={() => handSubmit()}>
          Submit
        </button>
      </form>
    </div>
  );
};
