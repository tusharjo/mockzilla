import React, { useState } from "react";
import endpoint from "../config";
import { Link } from "@reach/router";

export const Home = () => {
  const [type, setType] = useState("get");
  const [jsondata, setJsonData] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("mockmesecret")) || {}
  );

  const handleSubmit = () => {
    fetch(`${endpoint.APP_URL}/app-submit`, {
      method: "POST",
      body: JSON.stringify({
        jsondata,
        type,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
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
            </span>
            <span>{json}</span>
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
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};
