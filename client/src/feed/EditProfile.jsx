import React, { Component } from 'react'
import { Modal, Button, Input } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { UPDATE_USER_INFO, GET_USER_UID } from '../apollo/gql.js';
import userImage from '../../dist/images/user.png';
import axios from 'axios';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { newImage: '', newDescription: '', addImage: false, addDescription: false, hide: false, showImageButton: true, showDescriptionButton: true }
  }
  
  render() {
    const { user, show, toggle } = this.props;
    const { newImage, newDescription, addImage, addDescription, hide, showImageButton, showDescriptionButton } = this.state;
    return (
      <Modal className="centered" show={show} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>{user.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="centered">
            {/* add info description to sender and tags */}
          <Modal.Body style={{ color: 'black'}}>{user.description}</Modal.Body>
          {showImageButton ? <Button className="btn-2g bttn" onClick={() => this.setState({ addImage: true, addDescription: false, showDescriptionButton: false, showImageButton: false })}>Update Profile Image</Button> : <p />}
          {addImage
          ?
          <div>
            <input onChange={(e) => this.setState({ newImage: e.target.value })} placeholder="Add New Profile Image Link Here"/><br />
            <Button onClick={() => {
              axios.post('/shorten', {image: newImage})
                .then(({data}) =>  this.setState({ hide: true, addImage: false, addDescription: false, image: data, showImageButton: true, showDescriptionButton: true }))
                .catch(err => console.error('err in adding pic editProfile', err));
            }}>Add Profile Photo</Button>
          </div>
          :
          <p/>
          }
          {showDescriptionButton ? <Button className="btn-2g bttn" onClick={() => this.setState({ addDescription: true, hide: false, showDescriptionButton: false, showImageButton: false })}>Change Your Description</Button> : <p />}
        {addDescription
        ? 
          <div>
            <input onChange={(e) => this.setState({ newDescription: e.target.value })} placeholder="Add New Description Here"/><br/>
            <Button onClick={() => this.setState({ hide: true, addDescription: false, addImage: false, showDescriptionButton: true, showImageButton: true })}>Update Your Description</Button>
          </div>
        :
        <p />
        }
        {hide 
        ?
          <Mutation
            mutation={ UPDATE_USER_INFO }
            variables={{ id: user.id, description: newDescription !== '' ? newDescription : user.description, image: newImage !== '' ? newImage : user.image  }} 
            refetchQueries={() => [{ query: GET_USER_UID , variables: { uid: user.uid }} ]}
            onCompleted={toggle}>
            {updateUser => {
              return (
                  <Button 
                    className="btn-2g bttn" 
                    onClick={updateUser} 
                  >Update Your Profile</Button>
              );
            }}
          </Mutation>
        :
          <p />
       }

        </Modal.Body>
      </Modal>
    );
  }
}