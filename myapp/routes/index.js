var express = require("express");

var router = express.Router();
const PinataController = require("../controller/PinataController");
const FileController = require("../controller/FileController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({
    say: "hi",
  });
});

router.get("/test", function (req, res, next) {
  PinataController.api.test(res);
});

router.post("/api/v1/pinata/add", function (req, res, next) {
  PinataController.api.pinFileToIPFS(res);
});

router.delete("/api/v1/pinata/:hash", function (req, res, next) {
  PinataController.api.unpin(req, res);
});

router.post("/api/v1/uploadFile", function (req, res, next) {
  console.log(req.params);
  FileController.api.uploadFile(req, res);
});

module.exports = router;
