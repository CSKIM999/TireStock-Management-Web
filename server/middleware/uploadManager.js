const common = require("oci-common");
const os = require("oci-objectstorage");

let uploadManager = () => {
  // import { basename, join } from "path";
  const { basename, join } = require("path");
  // import { readdir } from "fs";
  const { readdir } = require("fs");
  const provider = new common.ConfigFileAuthenticationDetailsProvider();
  const directoryPath = "uploads"; // folder path where i want to upload files
  const namespaceName = "cnylck3cahga"; // my bucket's namespaceName
  const bucketName = "bucket-20230124-0355"; // bucket name where i want to save

  const client = new os.ObjectStorageClient({
    authenticationDetailsProvider: provider,
  });

  const uploadManager = new os.UploadManager(client, {
    enforceMD5: true,
  });

  (async () => {
    // Read files from the directory
    readdir(directoryPath, (err, files) => {
      if (err) return console.log("Unable to scan directory: " + err);

      files.forEach(async (filename) => {
        const objectName = `${basename(filename)}`;
        console.log(`Uploading ${objectName}`);

        try {
          console.time("Upload Time");
          const callback = (res) => {
            console.log("Progress: ", res);
          };
          await uploadManager.upload(
            {
              content: {
                filePath: join(directoryPath, filename),
              },
              requestDetails: {
                namespaceName: namespaceName,
                bucketName: bucketName,
                objectName: objectName,
              },
            },
            callback
          );

          console.timeEnd("Upload Time");
        } catch (ex) {
          console.error(`Failed due to ${ex}`);
          return ex;
        }
      });
    });
  })();
};

module.exports = { uploadManager };
