import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function MissingAccountMessage() {
  return (
    <Row>
      <h6>
        You don't have bank accouts added to your profile, add one{" "}
        <Link to="/account/add">here.</Link>
      </h6>
    </Row>
  );
}

export default MissingAccountMessage;
