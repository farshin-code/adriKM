export const getMedia = (audio, video) => {
  return new Promise((resolve, reject) =>
    navigator.mediaDevices
      .getUserMedia({
        audio: { echoCancellation: true },
        video: true,
      })
      .then((stream) => {
        console.log("i got stream", stream);
        resolve(stream);
      })
      .catch((error) => {
        console.log("i got error:", error);
        reject(error);
      })
  );
};

export const permissionCheck = () => {
  const cameraCheck = () =>
    new Promise((resolve, reject) => {
      navigator.permissions
        .query({
          name: "camera",
        })
        .then((result) => {
          if (result.state === "granted") {
            resolve(true);
          } else {
            reject("permission denied to camera");
          }
        });
    });

  const microphoneCheck = () =>
    new Promise((resolve, reject) => {
      navigator.permissions
        .query({
          name: "microphone",
        })
        .then((result) => {
          if (result.state === "granted") {
            resolve(true);
          } else {
            reject("permission denied to microphone");
          }
        });
    });
  return Promise.all([cameraCheck(), microphoneCheck()]);
};

export const revokeMedia = (stream) => {
  stream.getTracks().forEach((track) => track.stop());
};
