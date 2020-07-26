import React from 'react';
import Select from 'react-select';
import { useColorMode } from "@chakra-ui/core";
import { defaultValue, status } from './model';

const formatOptionLabel = (data: any) => {
  return (
    <span>
      <span>{data.value}</span> - {data.label}
    </span>
  );
};

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
      backgroundColor: colorMode === "light" ? "#fff" : "rgba(255,255,255,0.06)",
      borderColor: colorMode === "light" ? null : "rgba(255,255,255,0.04)",
      padding: "4px 7px"
    })
  }
}


const SelectHttpStatusCode = ({
  setHttpStatus, defaultSelected
}: { setHttpStatus: any; defaultSelected?: any }) => {
  const { colorMode } = useColorMode();

  return (
    <Select
      options={status}
      defaultValue={defaultSelected || defaultValue}
      styles={customStyle(colorMode)}
      formatOptionLabel={formatOptionLabel}
      value={(status ? status.find((option) => option.value) : '') as any}
      onChange={code => setHttpStatus(code.value)}
      maxMenuHeight={200}
    />
  );
};

export default SelectHttpStatusCode;