import React, { Component } from 'react';
import { Form, FormGroup, Radio} from "react-bootstrap";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() { 
    return (
      <Form>
        <FormGroup>
          <Radio name="radioGroup" inline>
            Show LinkedIn
          </Radio>{' '}
          <Radio name="radioGroup" inline>
            Hide LinkedIn
          </Radio>{' '}
        </FormGroup>
      </Form>
    )
  }
}
