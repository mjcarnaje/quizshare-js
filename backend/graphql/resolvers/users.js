const bcrypt = require('bcryptjs');
const { generateToken } = require('../../utils/generateToken');
const {
	validateRegisterInput,
	validateLoginInput,
} = require('../../utils/validators');
const { UserInputError } = require('apollo-server');
const User = require('../../models/User');
const Quiz = require('../../models/Quiz');
const Profile = require('../../models/Profile');
const picUploader = require('../../utils/picUploader');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
	Query: {
		currentUser: async (parent, args, context) => {
			const user = checkAuth(context);
			const loadedUser = await User.findById(user.id);
			return loadedUser;
		},
	},
	Mutation: {
		login: async (parent, { username, password }) => {
			const { valid, errors } = validateLoginInput(username, password);

			const user = await User.findOne({ username });

			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}

			if (!user) {
				errors.general = 'User not found';
				throw new UserInputError('User not found', { errors });
			}

			const match = await bcrypt.compare(password, user.password);

			if (!match) {
				errors.general = 'Wrong Credential';
				throw new UserInputError('Wrong Credentials', { errors });
			}

			const token = generateToken(user);

			return {
				...user._doc,
				id: user.id,
				token,
			};
		},
		register: async (
			parent,
			{ registerInput: { username, email, password, confirmPassword } }
		) => {
			const currentUserInfo = await User.find();

			const { valid, errors } = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword
			);

			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}

			const user_username = await User.findOne({ username });
			const user_email = await User.findOne({ email });

			if (user_email && user_username) {
				throw new UserInputError('Both username and email is taken', {
					errors: {
						email: 'This email is already taken',
						username: 'This username is already taken',
					},
				});
			} else if (user_username) {
				throw new UserInputError('Username is taken', {
					errors: {
						username: 'This username is already taken',
					},
				});
			} else if (user_email) {
				throw new UserInputError('Email is taken', {
					errors: {
						email: 'This email is already taken',
					},
				});
			}

			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString(),
			});

			const res = await newUser.save();

			const token = generateToken(res);
			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
		updateAccount: async (
			parent,
			{
				updateAccountInput: {
					avatar,
					email,
					username,
					password,
					confirmPassword,
				},
			},
			context
		) => {
			const user = checkAuth(context);
			const currentUserInfo = await User.findById(user.id);

			if (currentUserInfo.email === email) {
				email = null;
			}
			if (currentUserInfo.username === username) {
				username = null;
			}

			const { valid, errors } = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword
			);

			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}

			const userFields = {};

			try {
				if (username || email) {
					const user_username = await User.findOne({ username });
					const user_email = await User.findOne({ email });

					if (user_email && user_username) {
						throw new UserInputError('Both username and email is taken', {
							errors: {
								email: 'This email is already taken',
								username: 'This username is already taken',
							},
						});
					} else if (user_username) {
						throw new UserInputError('Username is taken', {
							errors: {
								username: 'This username is already taken',
							},
						});
					} else if (user_email) {
						throw new UserInputError('Email is taken', {
							errors: {
								email: 'This email is already taken',
							},
						});
					}

					if (username) userFields.username = username;
					if (email) userFields.email = email;
				}

				if (password && confirmPassword) {
					userFields.password = await bcrypt.hash(password, 12);
				}

				let userData = await User.findById(user.id);

				if (avatar) {
					const pic = await picUploader(avatar);
					userFields.avatar = pic;
				}

				if (userData) {
					userData = await User.findOneAndUpdate(
						{ _id: user.id },
						{ $set: userFields },
						{ new: true }
					);

					return userData;
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		addAvatar: async (parent, { picture }, context) => {
			const user = checkAuth(context);
			try {
				const pic = await picUploader(picture);

				await User.updateOne({ _id: user.id }, { $set: { avatar: pic } });

				return 'Picture Added';
			} catch (err) {
				throw new Error(err);
			}
		},
		deleteUserData: async (parent, args, context) => {
			const user = checkAuth(context);

			try {
				await Quiz.deleteMany({ author: user.id });
				await Profile.findOneAndDelete({ user: user.id });
				await User.findOneAndDelete({ _id: user.id });

				return 'Delete Account';
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
