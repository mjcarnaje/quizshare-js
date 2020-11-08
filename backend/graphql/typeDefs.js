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
	type Social {
		facebook: String
		twitter: String
		instagram: String
		youtube: String
	}
	type Profile {
		id: ID!
		user: ID!
		firstName: String
		lastName: String
		birthday: String
		country: String
		social: Social
	}
	input Questions {
		question: String!
		choices: [String]!
		answer: String!
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
		username: String
		password: String
		confirmPassword: String
	}
	input QuizInput {
		title: String!
		description: String!
		questions: [Questions!]
	}
	input ProfileInput {
		firstName: String!
		lastName: String!
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

		loadUser: User!
	}
	type Mutation {
		register(registerInput: RegisterInput!): User!
		login(username: String!, password: String!): User!

		updateAccount(updateAccountInput: UpdateAccountInput!): String!
		addAvatar(picture: String!): String!

		createQuiz(quizInput: QuizInput!): Quiz!
		deleteQuiz(quizId: String!): String!

		addQuestion(quizId: String!, questions: [Questions!]): Quiz!
		deleteQuestion(quizId: String!, questionId: String!): String!

		toggleLikeQuiz(quizId: String!): Quiz!

		createComment(quizId: String!, body: String!): Quiz!
		deleteComment(quizId: String!, commentId: String!): Quiz!

		createAndUpdateProfile(profileInput: ProfileInput!): Profile!
	}
	type Subscription {
		Quiz: Quiz!
	}
`;
