const multer = require('multer');
const fs = require('fs');

const crypto = require('crypto');

const fileUploader = multer({
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      return cb(null, true);
    }
    return cb(null, false);
  },
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB max file size
  },
  storage: multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + `${Math.random()}`.substring(2);

      return cb(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
});

async function deleteFile(file) {
  await fs.promises.unlink(file.path);
  console.log(`File ${file.filename} deleted!`);
}

function createHash(string) {
  const hash = crypto.createHash('sha256');
  hash.update(string);
  return hash.digest('hex');
}

function createSaltedHash(string) {
  return createHash(string + process.env.JWT_SALT);
}

// console.log(createSaltedHash("124"));

module.exports = { fileUploader, deleteFile, createSaltedHash };
