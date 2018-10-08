import React, { Component } from 'react'; 
import { Query, Mutation } from 'react-apollo';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { getTags } from '../../gql.js';

export default class TagDropdown extends Component {
  render() {
    return (
      <Query query={getTags}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error {console.log(error)}</div>
        return (
          <DropdownButton title="Tags" id="dropdown-basic-default">
            {data.tags.map((tag, i) => (
              <MenuItem 
                key={tag.name}
                id="bg-nested-dropdown"
                eventKey={tag.name}
                onSelect={this.props.addTags}
              >
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
