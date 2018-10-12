import gql from 'graphql-tag';

export const CREATE_QUESTION = gql`
  mutation createQuestion($user: UserCreateOneInput, $description: String!, $coins: Int!, $title: String!, $text: Boolean!, $audio: Boolean!, $video: Boolean!, $duration: Int!, $tags: [String!]!) {
    createQuestion(user: $user, description: $description, tags: $tags, coins: $coins, title: $title, text: $text, audio: $audio, video: $video, duration: $duration) {
      description
      title
    }
  }
`;

export const GET_QUESTIONS = gql`
  query {
    questions {
      user {
        username
      }
      description
      active
      coins
      title
      text
      audio
      video
      duration
      tags
    }
  }
`;

export const GET_TAGS = gql`
  query {
    tags {
      name
    }
  }
`;

// export const UPDATE_USER = gql`
// mutation updateUser($id: String!, $email: String, $uid: String, $description: String, $coins: Int, $username: String) {
//     updateUser(id: $id, email: $email, uid: $uid, description: $description, coins: $coins, username: $username) {
//         id
//         description
//     }
// }
// `;

export const GET_USER_QUESTIONS = gql`
<<<<<<< HEAD
  query questionsByUser($userId: String!) {
    questionsByUser(userId: $userId) {
      title
      description
      tags
    }
=======
query questionsByUser($username: String!) {
  questionsByUser(username: $username) {
    title
    description
    tags
>>>>>>> dev
  }
`;

export const CREATE_USER = gql`
mutation createUser($username: String! $email: String!, $uid: String!) {
    createUser(username: $username, email: $email, uid: $uid) {
      id
      username
      email
    }
  }
`;

export const CREATE_LINKED_IN_USER = gql`
  mutation createLinkedInUser($linkedInEmail: String!, $linkedInId: String!, $email: String!, $username: String!, $tags: [String], $description: String, $image: String) {
    createLinkedInUser(linkedInEmail: $linkedInEmail, linkedInId: $linkedInId, email: $email, username: $username, tags: $tags, description: $description, image: $image) {
      email
      username
      id
      linkedInId
      image
      username
      tags
    }
  }
`;

export const GET_USER_UID = gql`
query user($uid: String!) {
  user(uid: $uid) {
    id
    username
    email
    uid
    tags
    image
    ranking
    description
    coins
    inSession
    online
    dailyClaimed
    debt
  }
}
`;

export const UPDATE_USER_INFO = gql`
mutation updateUser($id: ID!, $email: String, $uid: String, $description: String, $coins: Int, $tags: [String], $username: String, $image: String, $dailyClaimed: Boolean, $debt: Int, $online: Boolean, $inSession: Boolean) {
    updateUser(id: $id, email: $email, uid: $uid, description: $description, coins: $coins, tags: $tags, username: $username, image: $image, dailyClaimed: $dailyClaimed, debt: $debt, online: $online, inSession: $inSession) {
        id
        description
        image
        description
        coins
        username
    }
  }
`;

export const CREATE_SESSION = gql`
mutation createSession($type: String!, $question: QuestionCreateOneInput, $expert: UserCreateOneInput, $pupil: UserCreateOneInput, $duration: Int, $completed: Boolean, $startedAt: DateTime, $endedAt: DateTime) {
  createSession(type: $type, question: $question, expert: $expert, pupil: $pupil, duration: $duration, completed: $completed, startedAt: $startedAt, endedAt: $endedAt) {
    id
  }
}
`

export const UPDATE_SESSION = gql`
  mutation updateSession(
    $id: String!
    $accepted: Boolean
    $completed: Boolean
    $startedAt: DateTime
    $endedAt: DateTime
  ) {
    updateSession(
      id: $id
      accepted: $accepted
      completed: $completed
      startedAt: $startedAt
      endedAt: $endedAt
    ) {
      accepted
      completed
    }
  }
`;

// subject to rename
export const GET_UNACCEPTED_SESSIONS = gql`
query sessionsWhereUnacceptedPupil($username: String) {
  sessionsWhereUnacceptedPupil(username: $username) {
    id
    type
    expert {
      username
    }
    pupil {
      username
    }
    accepted
    completed
  }
}
`

export const GET_EXPERT_SESSIONS = gql`
query sessionsForExpert($username: String) {
  sessionsForExpert(username: $username) {
    id
    type
    expert {
      username
    }
    pupil {
      username
    }
    accepted
    completed
  }
}
`

export const GET_ACCEPTED_SESSIONS = gql`
query sessionsWhereAcceptedExpert($username: String) {
  sessionsWhereAcceptedExpert(username: $username) {
    id
    type
    expert {
      username
    }
    pupil {
      username
    }
    accepted
    completed
  }
}
`

export const GET_REJECTED_SESSIONS = gql`
query sessionsWhereRejectedExpert($username: String) {
  sessionsWhereRejectedExpert(username: $username) {
    id
    type
    expert {
      username
    }
    pupil {
      username
    }
    accepted
    completed
  }
}
`
