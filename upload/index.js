const multer = require("multer");
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, `${process.cwd()}/public/img`);
  },
  filename: (req, file, cb) => {

    const date = new Date();
    const newName = date.getTime() + "_" + file.originalname;
    cb(null, newName);
  },
});
const upload = multer({ storage });
module.exports = upload;
