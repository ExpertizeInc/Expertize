import React, { Component } from 'react'; 
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import { DropdownButton, MenuItem } from 'react-bootstrap';
// import { graphql } from 'react-apollo'


const getTags = gql`
  query {
    tags {
      name
    }
  }
`

const addTagToUser = gql`
  mutation addTagToUser($id: String!, $tag: String!){
    addTagToUser(id: $id, tag: $tag) {
      name
    }
  }
`

export default class TagDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { id: '', tag: '' };
  }

  componentDidMount() {
    this.setState({ id: this.props.id })
    // this.props.client.query({
    //   query: getTags
    // }).then(({ data }) => {
    //   this.setState({ tags: data})
    // })
  }



  render() {
    return (
      <Query query={getTags}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error:{console.log(error)}</div>
        return (
          <DropdownButton title="Tags" id="dropdown-basic-default">
            {data.tags.map(tag => (
              <MenuItem 
                key={tag.name} 
                id="bg-nested-dropdown"
                eventKey={tag.name}
                onSelect={this.props.addTag} 
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
