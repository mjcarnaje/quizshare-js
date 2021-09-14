const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String
    username: String!
    avatar: String
    cover: String
    createdAt: String!
  }
  type Profile {
    id: ID!
    user: ID!
    firstName: String
    lastName: String
    bio: String
    birthday: String
    country: String
    social: Social
    userData: User
  }
  type Social {
    facebook: String
    twitter: String
    instagram: String
    youtube: String
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type Comment {
    id: ID!
    createdAt: String!
    body: String!
    author: User
  }
  type Choices {
    id: String!
    value: String!
  }
  type Question {
    id: String!
    question: String!
    choices: [Choices]!
    answer: String!
    explanation: String
    withExplanation: Boolean
  }
  type Quiz {
    id: ID!
    image: String
    title: String!
    description: String!
    questions: [Question!]!
    questionCount: Int
    likes: [Like]
    likeCount: Int
    comments: [Comment]
    commentCount: Int
    createdAt: String
    author: User!
  }
  input ChoicesInput {
    id: String!
    value: String!
  }
  input Questions {
    id: String!
    question: String!
    choices: [ChoicesInput]!
    answer: String!
    explanation: String
    withExplanation: Boolean
  }
  input QuizInput {
    title: String!
    description: String!
    image: String
    questions: [Questions!]!
  }
  input RegisterInput {
    username: String!
    password: String!
    email: String!
    confirmPassword: String!
  }
  input UpdateAccountInput {
    email: String
    avatar: String
    cover: String
    username: String
    password: String
    confirmPassword: String
  }
  input ProfileInput {
    firstName: String
    lastName: String
    bio: String
    country: String
    birthday: String
    facebook: String
    twitter: String
    instagram: String
    youtube: String
  }
  type Query {
    getQuizzes: [Quiz!]!
    getQuiz(quizId: ID!): Quiz!
    getUserQuizzes: [Quiz]!

    getAllUser: [Profile!]!

    getOthersQuizzes(userId: ID!): [Quiz]!

    currentUser: User!

    getProfileUser: Profile!
    getOthersProfile(userId: ID!): Profile!
  }
  type Mutation {
    register(registerInput: RegisterInput!): User!
    login(username: String!, password: String!): User!

    updateAccount(updateAccountInput: UpdateAccountInput!): User!
    addAvatar(picture: String!): String!

    createQuiz(quizInput: QuizInput!): Quiz!
    updateQuiz(quizId: String!, quizInput: QuizInput!): Quiz!
    deleteQuiz(quizId: String!): String!

    addQuestion(quizId: String!, questions: [Questions!]): Quiz!
    deleteQuestion(quizId: String!, questionId: String!): String!

    toggleLikeQuiz(quizId: String!): Quiz!

    createComment(quizId: String!, body: String!): Quiz!
    deleteComment(quizId: String!, commentId: String!): Quiz!

    createAndUpdateProfile(profileInput: ProfileInput!): Profile!
    deleteUserData: String!
  }
  type Subscription {
    Quiz: Quiz!
  }
`;
