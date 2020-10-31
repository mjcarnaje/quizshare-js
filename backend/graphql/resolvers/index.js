const usersResolvers = require('./users');
const quizResolvers = require('./quiz');
const User = require('../../models/User');
module.exports = {
	Query: { ...quizResolvers.Query },
	Mutation: {
		...usersResolvers.Mutation,
		...quizResolvers.Mutation,
	},
	Quiz: {
		likeCount: (parent) => parent.likes.length,
		author: async (parent) => {
			const user = User.findById(parent.author);
			return user;
		},
	},
};
