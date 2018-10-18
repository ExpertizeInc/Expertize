import React, { Component } from 'react'
import { Modal, Button, Input } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { UPDATE_USER_INFO, GET_USER_UID } from '../apollo/gql.js';
import userImage from '../../dist/images/user.png';
// import axios from 'axios';

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
          <Modal.Body>{user.description}</Modal.Body>
          {showImageButton ? <Button className="btn-2g bttn" onClick={() => this.setState({ addImage: true, hide: false, addDescription: false, showDescription: false, showImageButton: false })}>Update Profile Image</Button> : <p />}
          {addImage
          ?
          <div>
            <input onChange={(e) => this.setState({ newImage: e.target.value })} placeholder="Add New Profile Image Link Here"/><br />
            {/* <Button 
              onClick={() => {
                axios.post('/shorten', { image: newImage })
                  .then(({data}) => this.setState({ newImage: data, hide: true, addImage: false, showDescriptionButton: true, showImageButton: false }))
                  .catch(err => console.error('error in saving photo pop up', err));
              }}>Add Profile Photo</Button> */}
          </div>
          :
          <p/>
          }
          {showDescriptionButton ? <Button className="btn-2g bttn" onClick={() => this.setState({ addDescription: true, hide: false, addImage: false, showDescriptionButton: false })}>Update Your Description</Button> : <p />}
        {addDescription
        ? 
          <div>
            <input onChange={(e) => this.setState({ newDescription: e.target.value })} placeholder="Add New Description Here"/><br/>
            <Button onClick={() => this.setState({ hide: true, addDescription: false, showDescriptionButton: true, showImageButton: true, addImage: false })}>Add Profile Photo</Button>
          </div>
        :
        <p />
        }
        {hide 
        ?
          <Mutation
            mutation={ UPDATE_USER_INFO }
            variables={{ id: user.id, description: newDescription !== '' ? newDescription : user.description, image: newImage !== '' ? newImage : user.image ? user.image : userImage }} 
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