import React from "react";
import Select from "react-select";
import { useColorMode } from "@chakra-ui/core";
import { defaultValue, status, StatusOption } from "./model";

const formatOptionLabel = (data: StatusOption) => (
  <span>
    <span>{data.value}</span> - {data.label}
  </span>
);

const customStyle = (colorMode: string) => {
  return {
    option: (base: any) => ({
      ...base,
      padding: "10px",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: colorMode === "light" ? "#333" : "#fff",
    }),
    control: (base: any) => ({
      ...base,
      color: "red",
      backgroundColor:
        colorMode === "light" ? "#fff" : "rgba(255,255,255,0.06)",
      borderColor: colorMode === "light" ? null : "rgba(255,255,255,0.04)",
      padding: "4px 7px",
    }),
    input: (base: any) => ({
      ...base,
      color: colorMode === "light" ? "#333" : "#fff",
    }),
  };
};

type SelectHttpStatusCodeProps = {
  setHttpStatus: React.Dispatch<React.SetStateAction<string>>;
};

const SelectHttpStatusCode = (props: SelectHttpStatusCodeProps) => {
  const { colorMode } = useColorMode();

  return (
    <Select
      inputId="httpstatus"
      options={status}
      defaultValue={defaultValue}
      styles={customStyle(colorMode)}
      formatOptionLabel={formatOptionLabel}
      onChange={(code) => props.setHttpStatus((code as StatusOption).value)}
      maxMenuHeight={200}
    />
  );
};

export default SelectHttpStatusCode;