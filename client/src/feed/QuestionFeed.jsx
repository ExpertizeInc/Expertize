import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_QUESTIONS, GET_FILTERED_QUESTIONS } from "../apollo/gql.js";
import QuestionFeedItem from "./QuestionFeedItem.jsx";
import MDSpinner from "react-md-spinner";
import { userInfo } from "os";

export default class QuestionFeed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, status, order, chat, tags } = this.props;
    return (
      <div className="centered">
        <Query
          query={GET_FILTERED_QUESTIONS}
          variables={{
            sort: order,
            online: status.includes("online"),
            offline: !status.includes("offline"),
            audio: chat.includes("audio"),
            video: chat.includes("video"),
            text: chat.includes("text")
          }}
          pollInterval={500}
        >
          {({ loading, error, data, fetchMore }) => {
            if (loading) return <div><MDSpinner size="50" /></div>
            if (error) return <div> Error {console.log(error)} </div>;
            if (true) console.log('this is feed data, checking if answeredby is all null', data)
            return (
              <div>
                {data.questionsByFilter.map((question, i) => (
                  <QuestionFeedItem
                    question={question}
                    user={user}
                    key={question.id}
                  />
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
