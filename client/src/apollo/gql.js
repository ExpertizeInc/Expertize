import gql from 'graphql-tag';

export const CREATE_QUESTION = gql`
mutation createQuestion($id: ID!, $user: UserCreateOneInput, $description: String!, $userCoins: Int!, $coins: Int!, $debt: Int, $title: String!, $text: Boolean!, $audio: Boolean!, $video: Boolean!, $duration: Int!, $tag: TagCreateOneInput) {
  createQuestion(user: $user, description: $description, tag: $tag, coins: $coins, title: $title, text: $text, audio: $audio, video: $video, duration: $duration) {
    description
    title
  }
  updateUser(id: $id, coins: $userCoins, debt: $debt) {
    uid
    coins
  }
}
`;

export const FINISH_SESSION = gql`
mutation updateSession($id: String!, $questionId: ID!, $completed: Boolean, $user: ID!, $expertUser: ID!, $answeredBy: UserCreateOneInput, $expertRating: Int, $pupilRating: Int, $expertCoins: Int, $pupilCoins: Int, $endedAt: DateTime) {
  updateSession(id: $id, completed: $completed, endedAt: $endedAt) { 
    id
    completed
    endedAt
  } updateQuestion( id: $questionId, answeredBy: $answeredBy) {
    id 
    user{
      username
    }
    answeredBy {
      username
    }
  } pupil:updateUser(id: $user, coins: $pupilCoins, ranking: $pupilRating) {
    id
  } expert:updateUser(id: $expertUser, coins: $expertCoins, ranking: $expertRating) {
    id
  }
}
`;

export const GET_QUESTIONS = gql`
  query {
    questions {
      user {
        username
        online
        linkedInProfile
        description
      }
      id
      description
      coins
      title
      text
      createdAt
      audio
      video
      duration
      tag {
        name
      }
      id
    }
  }
`;

export const GET_FILTERED_QUESTIONS = gql`
  query($online: Boolean, $offline: Boolean, $sort: String, $username: String, $audio: Boolean, $video: Boolean, $text: Boolean, $after: String, $before: String) {
    questionsByFilter(online: $online, offline: $offline, sort: $sort, username: $username, audio: $audio, video: $video, text: $text, after: $after, before: $before) {
      user {
        username
        online
        image
        description
        linkedInProfile
      }
      id
      description
      coins
      title
      text
      createdAt
      audio
      video
      duration
    }
  }
`

export const GET_TAGS = gql`
  query {
    tags {
      name
    }
  }
`;

export const CREATE_MESSAGE = gql`
mutation createMessage($title: String, $message: String, $sender: UserCreateOneInput, $recipient: UserCreateOneInput) {
  createMessage(title: $title, message: $message, sender: $sender, recipient: $recipient) {
    message
  }
}
`

export const GET_ALL_MESSAGES = gql`
query allMessages($username: String!) {
  messagesSent(username: $username) {
    createdAt
    title
    message
    recipient {
      username
    }
  }
  messagesReceived(username: $username) {
    createdAt
    title
    message
    sender {
      username
    }
  }
}
`

export const GET_USER_QUESTIONS = gql`
  query questionsByUser($username: String!) {
    questionsByUser(username: $username) {
      title
      description
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      id
      username
      online
      questionsAsked {
        title
        answeredBy {
          username
        }
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String! $email: String!, $uid: String!) {
    createUser(username: $username, email: $email, uid: $uid) {
    id
    username
    email
    uid
    tag {
      name
    }
    image
    ranking
    description
    coins
    online
    dailyClaimed
    debt
    linkedInProfile
    questionsAsked {
      title
      answeredBy {
        username
      }
      id
    }
    }
  }
`;

export const GET_USER_UID = gql`
query user($uid: String!) {
  user(uid: $uid) {
    id
    uid
    description
    email
    image
    description
    coins
    username
    linkedInProfile
    image
    dailyClaimed
    online
    debt
    tag {
      name
    }
    questionsAsked {
      title
      answeredBy {
        username
      }
    }
  }
}`;

export const UPDATE_USER_INFO = gql`
mutation updateUser($id: ID!, $email: String, $uid: String, $description: String, $coins: Int, $tag: TagCreateOneInput, $username: String, $image: String, $dailyClaimed: Boolean, $debt: Int, $online: Boolean, $inSession: Boolean, $linkedInProfile: String) {
    updateUser(id: $id, email: $email, uid: $uid, description: $description, coins: $coins, tag: $tag, username: $username, image: $image, dailyClaimed: $dailyClaimed, debt: $debt, online: $online, inSession: $inSession, linkedInProfile: $linkedInProfile) {
        id
        uid
        description
        image
        description
        coins
        username
        linkedInProfile
        tag {
          name
        }
        image
        dailyClaimed
        online
        debt
        inSession
        questionsAsked {
          title
          answeredBy {
            username
          }
        }
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
      id
      username
      coins
      ranking
    }
    pupil {
      id
      username
      coins
      ranking
    }
    accepted
    completed
    question{
      duration
      id
      coins
    }
  }
}
`

export const GET_EXPERT_SESSIONS = gql`
query sessionsForExpert($username: String) {
  sessionsForExpert(username: $username) {
    id
    type
    expert {
      id
      username
      coins
      ranking
    }
    pupil {
      id
      username
      coins
      ranking
    }
    accepted
    completed
    question{
      duration
      id
      coins
    }
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

export const GET_ALL_FINISHED_SESSIONS = gql`
  query getAllFinishedSessions($id: String) {
    getAllFinishedSessions(id: $id) {
      pupil {
        username
      }
      expert {
        username
      }
      question{
        description
        title
        coins
      }
      completed
    }
  }
`
export const DELETE_SESSION = gql`
  mutation deleteSession($id: ID!) {
    deleteSession(id: $id) {
      id
    }
  }
`