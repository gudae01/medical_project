import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('ROLE_USER'); // 기본값을 'ROLE_USER'로 설정
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

        if (!username || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', { // URL을 실제 서버 URL로 수정
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, role })
            });

            if (response.ok) {
                alert("Signup successful");
                navigate('/login'); // 회원가입 후 로그인 페이지로 이동
            } else {
                const data = await response.json();
                alert(`Signup failed: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred during signup");
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}> {/* 폼 제출 이벤트 핸들링 */}
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
                <div>
                    <label>
                        Role:
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="ROLE_USER">User</option>
                            <option value="ROLE_ADMIN">Admin</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Signup</button> {/* submit 버튼으로 변경 */}
            </form>
        </div>
    );
}

export default Signup;
