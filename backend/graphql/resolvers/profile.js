const { UserInputError } = require("apollo-server");
const Profile = require("../../models/Profile");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    getProfileUser: async (parent, args, context) => {
      const user = checkAuth(context);

      try {
        const profile = await Profile.findOne({ user: user.id });
        return profile;
      } catch (err) {
        throw new Error(err);
      }
    },
    getOthersProfile: async (parent, { userId }, context) => {
      try {
        const profile = await Profile.findOne({ user: userId });
        return profile;
      } catch (err) {
        throw new Error(err);
      }
    },
    getAllUser: async () => {
      try {
        const profile = await Profile.find();
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
          bio,
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

      const profileFields = {};

      profileFields.user = user.id;

      profileFields.firstName = firstName;
      profileFields.lastName = lastName;
      profileFields.bio = bio;
      profileFields.country = country;
      profileFields.birthday = birthday;

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
