import { Box, Spinner, Flex } from "@chakra-ui/core";
import { Router } from "@reach/router";
import React, { Suspense } from "react";
const Home = React.lazy(() => import("./components/home"));
const Edit = React.lazy(() => import("./components/edit"));
const ManageCalls = React.lazy(() => import("./components/manage-calls"));
const NotFound = React.lazy(() => import("./components/not-found"));
const HowToUse = React.lazy(() => import("./components/how-to-use"));

export default function Route() {
  return (
    <Box minH={`calc(100vh - 144px)`}>
      <Suspense
        fallback={
          <Flex
            width="100%"
            minHeight="calc(100vh - 170px)"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="teal.500"
              size="xl"
            />
          </Flex>
        }
      >
        <Router>
          <Home path={"/"} />
          <ManageCalls path="/manage" />
          <HowToUse path="/how-to-use" />
          <Edit path="/edit/:appid" />
          <NotFound path="*" />
        </Router>
      </Suspense>
    </Box>
  );
}
