import { useEffect, useState } from "react";
import { FcApproval } from "react-icons/fc";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../contexts/AppContext";
import { useAuthContext } from "../contexts/AuthContext";
function formatDateToYYYYMMDDHHMM() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDate;
}
function MainRightPanel() {
  const { currentUser } = useAuthContext();
  const { grabedText } = useAppContext();
  const [doneList, setDoneList] = useState([]);
  useEffect(() => {
    grabedText &&
      fetch("http://127.0.0.1:4211/trigger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("adrikmtoken"),
        },
        body: JSON.stringify({
          grabedText: grabedText,
          user: currentUser.displayName,
        }),
      })
        .then((res) => {
          console.log("response:", res);
          setDoneList((prev) => [
            ...prev,
            {
              date: "[" + formatDateToYYYYMMDDHHMM() + "]",
              text: "' " + grabedText.substring(0, 10) + "...' ",
            },
          ]);
        })
        .catch((error) => {
          console.log("error :", error);
        });
  }, [grabedText?.split(" ").length === 20]);

  return (
    <div className=" border col-12 col-lg-6 p-4 p-lg-5 mt-2 d-flex  align-items-center flex-column">
      <div className="  p-4 text-center h-50">
        <h4
          // className="ps-5 ps-lg-0 "
          style={{ fontWeight: "bold", color: "#442190" }}
        >
          Analyzer:
        </h4>
        <p className="ps-5 ps-lg-0 pt-2">{grabedText}</p>
      </div>

      <div className=" row w-100">
        <div className="col-12 col-lg-6 p-4 p-lg-5 h-100 w-100 ">
          <hr />
          <ListGroup className="w-100">
            {doneList?.map((item, index) => {
              return (
                <ListGroup.Item key={index}>
                  <FcApproval /> {item.date} <b>{item.text}</b> Produced to
                  Kafka Server
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}

export default MainRightPanel;
