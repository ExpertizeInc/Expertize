import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import Questions from './Questions.jsx';


export default class Restricted extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
                <Questions user={this.props.user} />
        )
    }
}