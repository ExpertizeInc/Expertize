import React from 'react'
import { Panel, Col } from "react-bootstrap";

const Bio = () => (
  <div>
    <Col md={2}></Col><Col md={8}>
    <Panel>Shirley</Panel>
    <Panel>Alon: I am a software developer interested in fullstack development. My focus is mainly JavaScript but I love to learn new things and work on new projects</Panel>
    <Panel>Paul</Panel>
    </Col>
  </div>
)

export default Bio;