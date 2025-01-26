import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import ChooseUser from "./ChooseUser/ChooseUser";
import LoginPage from "./LoginPage/LoginPage";
import AdminDashboard from "./admin/AdminDashboard/AdminDashboard";

const Pages = () => {
    const [currentRole, setCurrentRole] = useState(null);

    return (
        <Router>
            <div className="page-container">
                {currentRole === null && 
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/choose" element={<ChooseUser />} />
                        <Route path="/Adminlogin" element={<LoginPage role="Admin" setCurrentRole={setCurrentRole} />} />
                        <Route path="/Studentlogin" element={<LoginPage role="Student" setCurrentRole={setCurrentRole} />} />
                        <Route path="/Teacherlogin" element={<LoginPage role="Teacher" setCurrentRole={setCurrentRole} />} />
                    </Routes>
                }

                {currentRole === "Admin" && <AdminDashboard />}
                {currentRole === "Student" && <Navigate to="/student/dashboard" />}
                {currentRole === "Teacher" && <Navigate to="/teacher/dashboard" />}
            </div>
        </Router>
    );
};

export default Pages;
