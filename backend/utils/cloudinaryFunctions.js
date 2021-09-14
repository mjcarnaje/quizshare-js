const { cloudinary } = require("./cloudinary");

module.exports.uploadPic = async (base64File) => {
  const pic = await cloudinary.uploader.upload(base64File, {
    upload_preset: "profiles",
  });

  return pic.url;
};

module.exports.deletePic = async (link) => {
  try {
    const publicId = link.slice(link.lastIndexOf("/") + 1).split(".")[0];
    cloudinary.v2.uploader.destroy(publicId, function (error, result) {
      console.log(result, error);
    });
  } catch (err) {
    console.log(err);
  }
};
