const { gql } = require('apollo-server');

module.exports = gql`
	type User {
		id: ID!
		email: String!
		token: String!
		username: String!
		avatar: String
		createdAt: String!
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
		author: User!
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
		questionCount: Int
		likes: [Like]
		likeCount: Int
		comments: [Comment]
		commentCount: Int
		isPublic: Boolean
		createdAt: String
		author: User!
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
		loadUser: User!
	}
	type Mutation {
		register(registerInput: RegisterInput!): User!
		login(username: String!, password: String!): User!
		addAvatar(picture: String!): String!
		createQuiz(
			title: String
			description: String
			questions: [Questions!]
		): Quiz!
		addQuestion(quizId: String!, questions: [Questions!]): Quiz!
		deleteQuiz(quizId: String!): String!
		deleteQuestion(quizId: String!, questionId: String!): String!
		toggleLikeQuiz(quizId: String!): Quiz!
		createComment(quizId: String!, body: String!): Quiz!
		deleteComment(quizId: String!, commentId: String!): Quiz!
	}
	type Subscription {
		Quiz: Quiz!
	}
`;
