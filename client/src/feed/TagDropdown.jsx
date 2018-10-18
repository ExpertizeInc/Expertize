import React, { Component } from 'react'; 
import { Query } from 'react-apollo';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { GET_TAGS } from '../apollo/gql.js';

export default class TagDropdown extends Component {
  render() {
    return (
      <Query query={GET_TAGS}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error {console.log(error)}</div>
        return (
          <DropdownButton className="round-input btn-white" title="Tags" id="dropdown-basic-default" >
            {data.tags.map((tag) => (
                <MenuItem 
                  key={tag.name}
                  id="bg-nested-dropdown"
                  eventKey={tag.name}
                  onSelect={this.props.addTag}>
                  {tag.name}
                </MenuItem>
            ))}
        </DropdownButton>
        )
      }}
      </Query>
    )
  }
}
