const pinataConfig = require("../config/pinata");
const pinataSDK = require("@pinata/sdk");
const { exit } = require("process");
const pinata = pinataSDK(
  pinataConfig.yourPinataApiKey,
  pinataConfig.yourPinataSecretApiKey
);

exports.api = {};

exports.api.test = async (res) => {
  pinata
    .testAuthentication()
    .then((result) => {
      //handle successful authentication here
      console.log(result);
      res.json({
        Msg: result,
      });
    })
    .catch((err) => {
      //handle error here
      console.log(err);
    });
};

exports.api.pinFileToIPFS = async (res) => {
  const fs = require("fs");
  const readableStreamForFile = fs.createReadStream(
    "/Users/timmy0618/Code/project/testbackend/myapp/Hololive_production_Logo.png"
  );
  const options = {
    pinataMetadata: {
      name: "test",
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };

  pinata
    .pinFileToIPFS(readableStreamForFile, options)
    .then((result) => {
      //handle results here
      console.log(result);
      res.json({
        Msg: result,
      });
    })
    .catch((err) => {
      //handle error here
      console.log(err);
    });
};

exports.api.editPinataFile = async (res) => {
  const hash = "QmeMhH3xHycB55x385FbpRWvY6rg93B6jcTL5s1XBTrpsQ";
  const metadata = {
    name: "new custom name",
    keyvalues: {
      newKey: "newValue",
      existingKey: "newValue",
      existingKeyToRemove: null,
    },
  };

  pinata
    .hashMetadata(hash, metadata)
    .then((result) => {
      //handle results here
      console.log(result);
    })
    .catch((err) => {
      //handle error here
      console.log(err);
    });
};

exports.api.unpin = async (req, res) => {
  var hash = req.params.hash;
  console.log(hash);

  pinata
    .unpin(hash)
    .then((result) => {
      //handle results here
      console.log(result);
      res.json({
        Msg: result,
      });
    })
    .catch((err) => {
      //handle error here
      console.log(err);
    });
};
