const { gql } = require('apollo-server');

module.exports = gql`
	type Like {
		id: ID!
		createdAt: String!
		username: String!
	}
	type Question {
		question: String!
		choices: [String]!
		answer: String!
	}
	type Quiz {
		id: ID!
		title: String!
		description: String!
		questions: [Question!]!
		likes: [Like]
		likeCount: Int
		isPublic: Boolean
		createdAt: String!
		author: User!
	}
	type User {
		id: ID!
		email: String!
		token: String!
		username: String!
		createdAt: String!
	}
	input Questions {
		question: String!
		choices: [String]!
		answer: String!
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}
	type Query {
		getQuizzes: [Quiz!]!
		getQuiz(quizId: ID!): Quiz!
	}
	type Mutation {
		register(registerInput: RegisterInput!): User!
		login(username: String!, password: String!): User!
		createQuiz(
			title: String
			description: String
			questions: [Questions!]
		): Quiz!
		addQuestion(quizId: String!, questions: [Questions!]): Quiz!
	}
	type Subscription {
		Quiz: Quiz!
	}
`;
