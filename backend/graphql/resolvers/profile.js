const { UserInputError } = require('apollo-server');
const Profile = require('../../models/Profile');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
	Query: {
		getProfileUser: async (parent, args, context) => {
			const user = checkAuth(context);
			try {
				const profile = await Profile.findById(user.id);
				return profile;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		createAndUpdateProfile: async (
			parent,
			{
				profileInput: {
					firstName,
					lastName,
					country,
					birthday,
					facebook,
					twitter,
					instagram,
					youtube,
				},
			},
			context
		) => {
			const user = checkAuth(context);

			if (firstName.trim() === '') {
				new UserInputError('First name must not blank');
			}
			if (lastName.trim() === '') {
				new UserInputError('Last name must not blank');
			}

			const profileFields = {};

			profileFields.user = user.id;

			if (firstName) profileFields.firstName = firstName;
			if (lastName) profileFields.lastName = lastName;
			if (country) profileFields.country = country;
			if (birthday) profileFields.birthday = birthday;

			profileFields.social = {};

			if (facebook) profileFields.social.facebook = facebook;
			if (twitter) profileFields.social.twitter = twitter;
			if (instagram) profileFields.social.instagram = instagram;
			if (youtube) profileFields.social.youtube = youtube;

			try {
				let profile = await Profile.findOne({ user: user.id });

				if (profile) {
					profile = await Profile.findOneAndUpdate(
						{ user: user.id },
						{ $set: profileFields },
						{ new: true }
					);
					return profile;
				}
				profile = new Profile(profileFields);

				await profile.save();

				return profile;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
