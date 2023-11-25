import data from "../handlers/db";
export class RoomModel {
  RoomName;
  Creator;
  Members;
  constructor() {}
  createRoom(roomName, creator) {
    return new Promise((resolve, reject) => {
      data
        .createRoom(roomName, creator)
        .then((result) => {
          resolve(result.id);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
