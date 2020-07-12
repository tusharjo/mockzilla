import React from "react";
import { Box, Link, Text, useColorMode } from "@chakra-ui/core";

export const Footer = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      as="footer"
      padding="1rem"
      bg={`mode.${colorMode}.box`}
      justifyContent="center"
      display="flex"
      borderTop={`1px ${colorMode === "light" ? "#dddddd" : "000000"} solid`}
    >
      <Text color={`mode.${colorMode}.text`}>
        <span role="img" aria-label="feedback">
          💟
        </span>{" "}
        For any feedback / issues / feature request, contact{" "}
        <Link
          href="mailto:tushar.jo@endurance.com?subject=MockME - Feedback"
          isExternal
        >
          Tushar Joshi
        </Link>
      </Text>
    </Box>
  );
};
