import { useContext, createContext, useState } from "react";
import resizeImage from "../handlers/imageResizer";
import STORAGE from "../handlers/storage";
import { revokeMedia } from "../handlers/Media";
const { Upload } = STORAGE;

const Context = createContext();
export const useAppContext = () => useContext(Context);

const AppContextProvider = ({ children }) => {
  const [titleOfNavbarButton, setTitleOfNavbarButton] = useState("Login");
  const [showSpinner, setShowSpinner] = useState(false);

  const [mediaAccess, setMediaAccess] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [grabedText, setGrabedText] = useState(null);
  const UploadAvatar = (file, uidAsfileName) => {
    return new Promise((resolve, reject) => {
      resizeImage(file, 80, 80, 0.8)
        .then((blob) => {
          Upload(blob, `avatars/${uidAsfileName}`)
            .then((url) => {
              resolve(url);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const revokeAccess = () => {
    revokeMedia(mediaStream);
    setMediaAccess(false);
    setMediaStream(null);
  };
  return (
    <Context.Provider
      value={{
        titleOfNavbarButton,
        setTitleOfNavbarButton,
        UploadAvatar,
        showSpinner,
        setShowSpinner,
        mediaAccess,
        setMediaAccess,
        mediaStream,
        setMediaStream,
        revokeAccess,
        grabedText,
        setGrabedText,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContextProvider;
