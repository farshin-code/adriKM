import React from "react";
import { Image } from "react-bootstrap";

function ContactUs() {
  return (
    <>
      <div className="container-fluid mt-3 ">
        <div className="row">
          <div className="col-12 col-lg-6 mt-2 text-justify p-4 p-lg-5 m-auto  d-flex justify-content-center align-items-center enter-from-left ">
            <Image src="./illustrations/contactus.svg" fluid />
          </div>
          <div className="col-12 col-lg-6 p-5 mt-2 m-auto  fade-in">
            <h4
              className="ps-5 ps-lg-0 "
              style={{ fontWeight: "bold", color: "#442190" }}
            >
              Contact Us
            </h4>
            <p className="ps-5 ps-lg-0 pt-2">Email : farshinasri@gmail.com</p>
            <p className="ps-5 ps-lg-0 pt-2">Phone : 123456</p>
            <p className="ps-5 ps-lg-0 pt-2"> social media:</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
