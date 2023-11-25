import { storage } from "../configs/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const STORAGE = {
  Upload(file, path) {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, path);
      uploadBytes(storageRef, file)
        .then((result) => {
          getDownloadURL(result.ref)
            .then((url) => {
              resolve(url);
            })
            .catch((error) => {
              reject(error.code);
            });
        })
        .catch((error) => {
          reject(error.code);
        });
    });
  },
};
export default STORAGE;
