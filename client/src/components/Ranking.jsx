import React, { Component } from 'react';
import StarRating from 'react-bootstrap-star-rating';

export default class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <StarRating
        defaultValue={this.props.ranking}
        min={0}
        max={10}
        step={0.5} />
    );
  }
}