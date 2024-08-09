import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Admin from './Admin';

function App() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = parseJwt(token);
            setRole(decodedToken.role);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setRole={setRole} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={role === "ROLE_USER" ? <Home /> : <Navigate to="/login" />} />
                <Route path="/admin" element={role === "ROLE_ADMIN" ? <Admin /> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

// JWT를 디코딩하는 함수
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        // Base64URL을 Base64로 변환
        const base64 = base64Url
            .replace(/-/g, '+')  // '-'를 '+'로 변환
            .replace(/_/g, '/'); // '_'를 '/'로 변환

        // Base64 인코딩된 문자열을 디코딩
        const jsonString = window.atob(base64);

        // JSON 문자열을 파싱하여 반환
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Invalid token", e);
        alert("An error occurred while decoding the token. Please log in again.");
        return null;
    }
}


export default App;
