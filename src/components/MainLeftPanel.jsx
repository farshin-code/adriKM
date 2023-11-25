import { useEffect, useRef, useState } from "react";
import { getMedia, permissionCheck } from "../handlers/Media";
import { Button, Stack, Ratio } from "react-bootstrap";
import { useAppContext } from "../contexts/AppContext";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function MainLeftPanel() {
  const [errorSpeech, setErrorSpeech] = useState(null);
  const {
    setMediaAccess,
    mediaStream,
    setMediaStream,
    revokeAccess,
    setGrabedText,
  } = useAppContext();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const videoRef = useRef(null);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setErrorSpeech(true);
    }
  });
  useEffect(() => {
    // check if media access is allowed:
    permissionCheck()
      .then((result) => {
        if (result.every((item) => item === true)) {
          setMediaAccess(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setMediaAccess(false);
      });

    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
      videoRef.current.volume = 0;
    }
  }, [setMediaAccess, mediaStream]);

  useEffect(() => {
    if (transcript.split(" ").length > 20) {
      resetTranscript();
      setGrabedText("");
    }
  }, [transcript]);
  const accessClickHandler = () => {
    if (mediaStream) {
      revokeAccess();
      SpeechRecognition.stopListening();
    } else {
      getMedia(true, true)
        .then((stream) => {
          setMediaAccess(true);
          setMediaStream(stream);
          console.log(stream);
          //speech recognition!
          SpeechRecognition.startListening({
            continuous: true,
          });
        })
        .catch((e) => {
          console.log(e);
          setMediaAccess(false);
          setMediaStream(null);
        });
    }
  };

  return (
    <>
      <Stack direction="vertical" gap={3}>
        {errorSpeech && (
          <p>Speech Recognition is not supported in your browser</p>
        )}
        <Ratio aspectRatio={"4x3"}>
          {mediaStream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              controls={false}
              width={"100%"}
              height={"100%"}
              style={{
                objectFit: "cover",
                border: "1px solid gray",
                borderRadius: "10px",
                backgroundColor: "black",
              }}
            />
          ) : (
            <div
              width={"100%"}
              height={"100%"}
              style={{
                objectFit: "cover",
                border: "1px solid gray",
                borderRadius: "10px",
                backgroundColor: "black",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <p>No Camera/Mic</p>
              <p>Please enable your camera and microphone By button below</p>
            </div>
          )}
        </Ratio>
        <Button
          variant={mediaStream ? "danger" : "primary"}
          onClick={accessClickHandler}
        >
          {mediaStream
            ? "Stop Access (Hang Up)"
            : "Let The App To Access Your Camera and Microphone"}
        </Button>
        {transcript && setGrabedText(transcript)}
      </Stack>
    </>
  );
}

export default MainLeftPanel;
