const {
	AuthenticationError,
	UserInputError,
	ExpandAbstractTypes,
} = require('apollo-server');
const Quiz = require('../../models/Quiz');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
	Query: {
		getQuizzes: async () => {
			try {
				const quizzes = await Quiz.find().sort({ createdAt: -1 });
				return quizzes;
			} catch (err) {
				throw new Error(err);
			}
		},
		getQuiz: async (parent, { quizId }) => {
			try {
				const quiz = await Quiz.findById(quizId);
				if (quiz) {
					return quiz;
				} else {
					throw new Error('Quiz not found');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		getUserQuizzes: async (parent, { userId }, context) => {
			const user = checkAuth(context);
			try {
				const quizzes = await Quiz.find();
				if (quizzes) {
					const userQuizzes = quizzes.filter(
						(q) => q.author.toString() === user.id.toString()
					);
					return userQuizzes;
				} else {
					throw new Error('Quiz not found');
				}
			} catch (err) {
				throw new Error();
			}
		},
	},
	Mutation: {
		createQuiz: async (
			parent,
			{ quizInput: { title, description, questions } },
			context
		) => {
			const user = checkAuth(context);

			if (description.trim() === '') {
				description = 'There is no description about in this quiz';
			}
			const newQuiz = new Quiz({
				title,
				description,
				author: user.id,
				questions: [...questions],
				createdAt: new Date().toISOString(),
			});
			await newQuiz.save();

			return newQuiz;
		},
		toggleLikeQuiz: async (parent, { quizId }, context) => {
			const { username } = checkAuth(context);
			try {
				const quiz = await Quiz.findById(quizId);

				if (quiz) {
					const isLiked =
						quiz.likes.filter((like) => like.username === username).length > 0;
					if (isLiked) {
						quiz.likes = quiz.likes.filter(
							(like) => like.username !== username
						);
					} else {
						quiz.likes.unshift({
							username,
							createdAt: new Date().toISOString(),
						});
					}
				} else {
					new UserInputError('Quiz not found');
				}
				await quiz.save();
				return quiz;
			} catch (err) {
				throw new Error(err);
			}
		},
		deleteQuiz: async (parent, { quizId }, context) => {
			const user = checkAuth(context);
			try {
				const quiz = await Quiz.findById(quizId);
				if (!quiz) {
					throw new Error('Quiz not found');
				}
				if (user.id == quiz.author) {
					await quiz.delete();
					return 'Quiz successfully deleted';
				} else {
					throw new AuthenticationError('Action not allowed');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		addQuestion: async (parent, { quizId, questions }, context) => {
			const user = checkAuth(context);
			try {
				const quiz = await Quiz.findById(quizId);

				if (!quiz) {
					throw new Error('Quiz not found');
				}

				if (user.id == quiz.author) {
					quiz.questions.push(...questions);
					await quiz.save();
					return quiz;
				} else {
					throw new AuthenticationError('Action not allowed');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		deleteQuestion: async (parent, { quizId, questionId }, context) => {
			const user = checkAuth(context);
			try {
				const quiz = await Quiz.findById(quizId);

				if (!quiz) {
					throw new Error('Quiz not found');
				}

				const question = quiz.questions.find(
					(question) => question.id === questionId
				);
				if (!question) {
					throw new Error('Question not found');
				}

				if (quiz.author.toString() !== user.id.toString()) {
					throw new AuthenticationError('Action not allowed');
				}
				await question.remove();
				await quiz.save();

				return 'Question deleted successfully';
			} catch (err) {
				throw new Error(err);
			}
		},
		createComment: async (parent, { quizId, body }, context) => {
			const user = checkAuth(context);

			try {
				const quiz = await Quiz.findById(quizId);

				if (!quiz) {
					throw new Error('Quiz not found');
				}
				const newComment = {
					body,
					author: user.id,
					createdAt: new Date().toISOString(),
				};

				quiz.comments.unshift(newComment);
				await quiz.save();
				return quiz;
			} catch (err) {
				throw new Error(err);
			}
		},
		deleteComment: async (parent, { quizId, commentId }, context) => {
			const user = checkAuth(context);

			try {
				const quiz = await Quiz.findById(quizId);
				if (quiz) {
					const commentIndex = quiz.comments.findIndex(
						(comment) => comment.id === commentId
					);
					if (quiz.comments[commentIndex].author == user.id) {
						quiz.comments.splice(commentIndex, 1);
						await quiz.save();
						return quiz;
					} else {
						throw new AuthenticationError('Action in not valid');
					}
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
