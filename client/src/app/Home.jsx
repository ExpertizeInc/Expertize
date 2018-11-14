import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
  }

  render() {
    return (
      <div className="centered vertical">
        <div className="splash-header">LEARN FROM EXPERTS</div>
        <div className="splash-sub">
          <p>{`Tutors exist, but young professionals lead busy lives. We bring
          together people of various expertise to connect them for brief,
          educational exchanges. The goal is to spread knowledge to
          many people across many subjects.`}</p>
          <div><Button style={{ marginTop: 10, borderRadius: 20, width: 150, height: 40 }} bsStyle="primary">LEARN MORE</Button></div>
        </div>
      </div>
    );
  }
};