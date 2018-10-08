import gql from 'graphql-tag';

export const createQuestion = gql`
  mutation createQuestion($userId: String!, $username: String!, $description: String!, $coins: Int!, $title: String!, $text: Boolean!, $audio: Boolean!, $video: Boolean!, $duration: Int!, $tags: [String!]!) {
    createQuestion(userId: $userId, username: $username, description: $description, tags: $tags, coins: $coins, title: $title, text: $text, audio: $audio, video: $video, duration: $duration) {
      description
      coins
      title
    }
  }
`;

export const getQuestions = gql`
  query {
    questions{
      username
      description
      active
      coins
      title
      text
      audio
      video
      duration
    }
  }
`;

export const getTags = gql`
  query {
    tags {
      name
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($id: String!, $email: String, $uid: String, $description: String, $coins: Int) {
    updateUser(id: $id, email: $email, uid: $uid, description: $description, coins: $coins) {
        id
        description
    }
}
`;

export const GET_USER_QUESTIONS = gql`
query questionsByUser($userId: String!) {
  questionsByUser(userId: $userId) {
    title
    description
  }
}
`;

export const createUser = gql`
mutation CreateUser($username: String! $email: String!, $uid: String!) {
    createUser(username: $username, email: $email, uid: $uid) {
      id
      username
      email
    }
}
`;

export const GET_USER_UID = gql`
query user($uid: String!) {
  user(uid: $uid) {
    id
    username
    email
    coins
  }
}
`;

export const UPDATE_USER_INFO = gql`
mutation updateUser($id: String!, $email: String, $uid: String, $description: String, $coins: Int, $tags: [String]) {
    updateUser(id: $id, email: $email, uid: $uid, description: $description, coins: $coins, tags: $tags) {
        id
        description
    }
}
`;