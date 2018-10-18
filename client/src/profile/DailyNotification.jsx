import React, { Component } from 'react';
import { Button, Modal, Image } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import { UPDATE_USER_INFO } from '../apollo/gql.js';
import { dailyMessage } from '../constants.js'

const DailyNotification = ({ toggle, show, user }) => (
  <Modal bsSize="small" className="centered daily-modal" show={show} >
    <Modal.Header>
      <Modal.Title>Daily login achieved!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>{dailyMessage[Math.floor(Math.random() * 6)].message}</h4>
      <div><Image src="../../images/coin.gif" style={{ width: "50px" }} /></div>
      <Mutation mutation={ UPDATE_USER_INFO } variables={{ id: user.id, coins: user.coins + 1, dailyClaimed: true }}>
      {updateUser => <Button className="btn-2g bttn" onClick={() => {
        updateUser()
        toggle()}}>Claim</Button>}
      </Mutation>
    </Modal.Body>
  </Modal>
  )

export default DailyNotification