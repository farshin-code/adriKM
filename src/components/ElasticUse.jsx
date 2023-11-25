import React from "react";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
import {
  FcNeutralDecision,
  FcCalendar,
  FcSms,
  FcNfcSign,
} from "react-icons/fc";
import { useState, useMemo } from "react";
const elasticsearchUrl = "http://127.0.0.1:9200";
const indexName = "grabbed_text";

// Search query

function ElasticUse() {
  const [result, setResult] = useState([]);
  const [keyword, setKeyword] = useState("");
  const searchBykeyword = (keyword) => {
    const requestBody = {
      query: {
        match: {
          grabbed: keyword, // Change to the field you want to search in
        },
      },
    };

    axios
      .post(`${elasticsearchUrl}/${indexName}/_search`, requestBody)
      .then((response) => {
        setResult([]);
        // Log the search results
        for (const hit of response.data.hits.hits) {
          console.log(hit._source.grabbed);
          setResult((prev) => [
            ...prev,
            {
              grabbed: hit._source.grabbed,
              dt: hit._source.dt,
              userName: hit._source.userName,
              polarity: hit._source.polarity,
              subjectivity: hit._source.subjectivity,
            },
          ]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container-fluid mt-5 h-100 ">
      <div className="d-flex justify-content-center align-items-center h-100">
        <InputGroup className="mb-3 w-50" size="lg">
          <Form.Control
            placeholder="Type Your Keyword..."
            type="text"
            autoFocus
            // onChange={(e) => console.log(e.target.value)}
            onKeyDown={(e) => {
              if (e.target.value !== "") {
                let timerID = null;
                // setResult([]);
                clearTimeout(timerID);
                timerID = setTimeout(() => {
                  searchBykeyword(e.target.value);
                  setKeyword(e.target.value);
                  console.log(e.target.value);
                }, 500);
              } else {
                setResult([]);
              }
            }}
          />
        </InputGroup>
      </div>

      <ListGroup className="w-100" size="lg">
        {result &&
          result?.map((item, index) => {
            return (
              <ListGroup.Item size="lg" key={index} fontsize="48px">
                <div className="row">
                  <div className="col-8">
                    <p>
                      <FcSms />
                      {item.grabbed.split(" ").map((item) => {
                        if (item === keyword) {
                          return <b>{item} </b>;
                        } else {
                          return <span>{item} </span>;
                        }
                      })}
                    </p>
                  </div>
                  <div className="col-4">
                    <p>
                      <FcCalendar />
                      {item.dt.substring(0, 10)}
                    </p>
                    <p>
                      <FcNfcSign />
                      Emotional Tone is :{" "}
                      {parseFloat(item.polarity) > 0 ? "Positive" : "Negative"}
                    </p>
                    <p>
                      <FcNeutralDecision />
                      Personal Opinion or Fact :{" "}
                      {parseFloat(item.subjectivity) > 0 ? "Personal" : "Fact"}
                    </p>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </div>
  );
}

export default ElasticUse;
