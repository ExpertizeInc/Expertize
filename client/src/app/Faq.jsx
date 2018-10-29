import React from "react";
import {
  Col,
  Button,
  Thumbnail,
  Panel,
  PageHeader,
  Grid,
  Row,
  Glyphicon
} from "react-bootstrap";

const Faq = () => (
  // <Grid style={{ backgroundColor: "#000", opacity: .9, borderRadius: 15 }}>
  <div>
  <Col md={3}></Col>
  <Col md={6} className="centered" style={{ backgroundColor: "#000", opacity: .9, borderRadius: 15, marginTop: '15vh', paddingBottom: 20 }}>
  {/* <Panel> */}
    <PageHeader>FAQs</PageHeader>
    <h4>How to use Expertize?</h4>
    <div>
      Getting starting on Expertize is easy. You will be given four coins upon joining to
      start you off onto your knowledge sharing journey. Coins are the main form
      of currency in this world. Beware, if you don't have enough coins to ask questions, you will incur DEBT!
    </div>
    <h4>How do you earn coins?</h4>
    <div>We try to encourage trading of knowledge, 
      so coins are earned in one of two ways:</div>
      <div>- Daily logins 
      give you one coin per day.</div>
      <div>- Answering any question gives 
      you two coins.</div>
      <div>Additionally, asking questions costs two coins</div>
    <h4>What is debt?</h4>
    <p>Debt increases the cost of posting a question. Debt is incurred when you continuously ask questions without answering others' questions!</p>
    {/* </Panel> */}
    </Col>
    <Col md={3}></Col>
    </div>
  
);

export default Faq;
