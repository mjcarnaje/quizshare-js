const { model, Schema } = require('mongoose');

const quizSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	title: String,
	description: String,
	questions: [
		{
			question: String,
			choices: [String],
			answer: String,
		},
	],
	isPublic: {
		type: Boolean,
		default: true,
	},
	likes: [
		{
			username: String,
			createdAt: String,
		},
	],
	comments: [
		{
			author: {
				type: Schema.Types.ObjectId,
				ref: 'users',
			},
			body: String,
			createdAt: String,
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = model('Quiz', quizSchema);
