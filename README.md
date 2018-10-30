# Expertize

> A social learning application that connects experts together to share knowledge in same or different fields, for brief 5-30 minute sessions where they can text or video chat.

## Team

  - __Product Owner__: Shirley
  - __Scrum Master__: Alon
  - __Software Engineer__: Paul

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Features](#Features)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Contributing](#contributing)

## Usage

> Anyone can sign up using basic email or through LinkedIn OAuth. Users can then immediately start answering questions or asking questions about various topics. Sessions can be through text or video and have a soft cap of 30 minutes. If you enjoyed a session with someone, you can even send your LinkedIn information to continue the connection!

## Requirements

- React
- Express
- Node.js
- Typescript
- Prisma
- Apollo
- GraphQL
- PostgreSQL
- Socket.io
- React-router
- Passport
- Firebase
- LinkedIn SDK

## Features

- Authentication through either Firebase or LinkedIn.
- Daily login coin award that resets at midnight to incentivize activity on app.
- Currency system that encourages both answering and asking of questions.
- Ability to rate another user after the session has completed.
- Personalized user profiles with avatars, bios and historical interaction data based on activity on the app.
- The choice between real-time, private text chat through socket.io or video chat through TokBox.
- Push notifications based on other users' actions such as someone claiming your question.
- Inbox messaging system allowing for continued conversations between users.
- Sort by ascending or descending timestamp and further narrow down results with filters that build on one another.

## Development

### Installing Dependencies

From within the root directory:

> npm install

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
