import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "./contexts/AuthContext";
import AppContextProvider from "./contexts/AppContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Verified from "./components/Verified";
import UpdatePassword from "./components/UpdatePassword";
import Layout from "./components/Layout";
import UserManage from "./components/UserManage";
import ContactUs from "./components/ContactUs";
import ElasticUse from "./components/ElasticUse";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthContext>
    <AppContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/verified" element={<Verified />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/user-manage" element={<UserManage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/elastic-search" element={<ElasticUse />} />
          </Routes>
        </Layout>
      </Router>
    </AppContextProvider>
  </AuthContext>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
