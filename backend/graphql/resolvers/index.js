const usersResolvers = require('./users');
const quizResolvers = require('./quiz');
const User = require('../../models/User');

module.exports = {
	Query: {
		...quizResolvers.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...quizResolvers.Mutation,
	},
	Comment: {
		author: async (parent) => {
			const user = await User.findById(parent.author);
			return user;
		},
	},
	Quiz: {
		likeCount: (parent) => parent.likes.length,
		commentCount: (parent) => parent.comments.length,
		questionCount: (parent) => parent.questions.length,
		author: async (parent) => {
			const user = await User.findById(parent.author);
			return user;
		},
	},
};
