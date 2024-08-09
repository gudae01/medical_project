import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setRole }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            alert("Please enter both username and password");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Unknown error');
            }
    
            const data = await response.json();
            const token = data.token;
            const decodedToken = parseJwt(token);
    
            localStorage.setItem('token', token);
            setRole(decodedToken.role);
    
            navigate(decodedToken.role === "ROLE_ADMIN" ? '/admin' : '/home');
        } catch (error) {
            console.error("Login error:", error);
            alert(`Login failed: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <div>
                <label>
                    Username:
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </label>
            </div>
            <button onClick={handleLogin}>Login</button>
            <div>
                <button onClick={() => navigate('/signup')}>Go to Signup</button> {/* 회원가입으로 이동 버튼 */}
            </div>
        </div>
    );
}

// JWT를 디코딩하는 함수
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    } catch (e) {
        console.error("Invalid token");
        return null;
    }
}

export default Login;
