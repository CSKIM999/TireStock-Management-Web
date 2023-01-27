const common = require("oci-common");
const os = require("oci-objectstorage");
const { readdir } = require("fs");
// const namespaceName = "cnylck3cahga"; // my bucket's namespaceName
// const bucketName = "bucket-20230124-0355"; // bucket name where i want to save
const { basename, join, resolve } = require("path");
const provider = new common.ConfigFileAuthenticationDetailsProvider();
const client = new os.ObjectStorageClient({
  authenticationDetailsProvider: provider,
});

const uploadItemsInDirectory = (dirPath, nameSpace, bucketName) => {
  return new Promise((resolve, reject) => {
    console.log(
      "🚀 ~ file: oci_sdk.js:13 ~ uploadItemsInDirectory ~ dirPath, nameSpace, bucketName",
      dirPath,
      nameSpace,
      bucketName
    );
    const uploadManager = new os.UploadManager(client, {
      enforceMD5: true,
    });

    (async () => {
      // Read files from the directory
      readdir(dirPath, (err, files) => {
        console.log("🚀 ~ file: oci_sdk.js:26 ~ readdir ~ dirPath", dirPath);
        if (err) return console.log("Unable to scan directory: " + err);

        files.forEach(async (filename) => {
          console.log(
            "🚀 ~ file: oci_sdk.js:30 ~ files.forEach ~ filename",
            filename
          );
          const objectName = `${basename(filename)}`;
          try {
            console.time("Upload Time");
            const callback = (res) => {
              console.log("Progress: ", res);
            };
            await uploadManager.upload(
              {
                content: {
                  filePath: join(dirPath, filename),
                },
                requestDetails: {
                  namespaceName: nameSpace,
                  bucketName: bucketName,
                  objectName: objectName,
                  contentType: "image/jpeg",
                },
              },
              callback
            );

            console.timeEnd("Upload Time");
          } catch (ex) {
            console.error(`Failed due to ${ex}`);
            console.log("🚀 ~ file: oci_sdk.js:45 ~ files.forEach ~ ex", ex);
            return reject(false);
          }
        });
        return resolve(true);
      });
    })();
  });
};

const deleteItem = async (fileName) => {
  try {
    // build delete object request
    const deleteObjectRequest = {
      bucketName: bucketName,
      namespaceName: namespaceName,
      objectName: fileName,
    };
    // delete object
    const resp = await client.deleteObject(deleteObjectRequest);
    console.log(resp);
    console.log(`Deleted ${fileName}.`);
  } catch (ex) {
    console.error(`Failed due to ${ex}`);
  }
};
module.exports = { uploadItemsInDirectory, deleteItem };
