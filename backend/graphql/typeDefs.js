const { gql } = require('apollo-server');

module.exports = gql`
	type User {
		id: ID!
		email: String!
		token: String
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
	input ChoicesInput {
		id: String!
		value: String!
	}
	input Questions {
		id: String!
		question: String!
		choices: [ChoicesInput]!
		answer: String!
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
		username: String
		password: String
		confirmPassword: String
	}
	input ProfileInput {
		firstName: String
		lastName: String
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

		currentUser: User!

		getProfileUser: Profile
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
