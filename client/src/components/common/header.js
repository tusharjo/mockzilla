import React from "react";
import { Link } from "@reach/router";
import { Navbar, Container, Badge } from "react-bootstrap";

export const Header = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <span style={{ color: "white", fontSize: "30px" }}>
                MockME &lt;/&gt;
              </span>
              <Badge
                as="span"
                pill
                variant="light"
                style={{
                  fontSize: "10px",
                  position: "relative",
                  top: "-16px",
                  marginLeft: "7px",
                }}
              >
                Beta
              </Badge>
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};
