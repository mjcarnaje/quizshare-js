const { model, Schema } = require('mongoose');

const profileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	firstName: String,
	lastName: String,
	birthday: String,
	country: {
		type: String,
		default: 'Philippines',
	},
	social: {
		facebook: String,
		twitter: String,
		instagram: String,
		youtube: String,
	},
});

module.exports = model('Profile', profileSchema);
