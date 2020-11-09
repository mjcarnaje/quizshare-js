const { cloudinary } = require('./cloudinary');

module.exports = async (base64File, folder) => {
	const pic = await cloudinary.uploader.upload(base64File, {
		upload_preset: folder ? folder : 'profiles',
		eager: [{ width: 700 }],
	});

	return pic.eager[0].url;
};
