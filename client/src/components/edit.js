import React, { useState } from "react";
import endpoint from "../config";
import { navigate } from "@reach/router";
import { api } from "../api";

const handleUpdate = (jsondata, appid) => {
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
    <div>
      <div>
        <textarea
          onChange={(e) => setJsonData(e.target.value)}
          value={jsondata}
          readOnly={readState}
        ></textarea>
        <button type="button" onClick={() => setReadState(!readState)}>
          Edit
        </button>
        <button type="button" onClick={() => handleDelete(props.appid)}>
          Delete
        </button>
        <button
          type="button"
          onClick={() => handleUpdate(jsondata, props.appid)}
        >
          Update JSON
        </button>
      </div>
    </div>
  );
};
