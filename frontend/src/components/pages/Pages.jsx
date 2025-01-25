import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import ChooseUser from "./ChooseUser/ChooseUser";
import LoginPage from "./LoginPage/LoginPage"
import AdminDashboard from "./admin/AdminDashboard/AdminDashboard";

const Pages = () => {
    return (
        <>
            <Router>
                <div className="page-container">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/choose" element={<ChooseUser />} />

                        <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
                        <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
                        <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

                        <Route path="/admin/dashboard" element={<AdminDashboard/>} />

                    </Routes>
                </div>
            </Router>
        </>
    );
};

export default Pages;
