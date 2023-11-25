import { db } from "../configs/firebase.config";
import { collection, addDoc } from "firebase/firestore";
const data = {
  createRoom: (roomName, creator) => {
    return new Promise((resolve, reject) => {
      addDoc(collection(db, "rooms"), {
        roomName: roomName,
        creator: creator,
        Members: [],
      })
        .then((result) => {
          resolve(result.id);
          console.log(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
export default data;
