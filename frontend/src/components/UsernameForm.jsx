// components/UsernameForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UsernameForm = () => {
    const [usernames, setUsernames] = useState({
        leetCode: '',
        codeChef: '',
        codeForces: '',
        gfg: ''
    });
    const navigate = useNavigate();

    // Clear local storage when the component mounts (i.e., page is reloaded)
    useEffect(() => {
        localStorage.clear();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsernames({ ...usernames, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('usernames', JSON.stringify(usernames));
        navigate('/dashboard');
    };

    return (
        <div style={styles.pageContainer}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Track Your Coding Progress</h2>
                <p style={styles.description}>Enter your usernames for each platform to start tracking your progress.</p>
                <input
                    type="text"
                    name="leetCode"
                    value={usernames.leetCode}
                    onChange={handleChange}
                    placeholder="LeetCode Username"
                    style={styles.input}
                    onFocus={(e) => e.target.style.boxShadow = styles.inputFocus.boxShadow}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
                <input
                    type="text"
                    name="codeChef"
                    value={usernames.codeChef}
                    onChange={handleChange}
                    placeholder="CodeChef Username"
                    style={styles.input}
                    onFocus={(e) => e.target.style.boxShadow = styles.inputFocus.boxShadow}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
                <input
                    type="text"
                    name="codeForces"
                    value={usernames.codeForces}
                    onChange={handleChange}
                    placeholder="CodeForces Username"
                    style={styles.input}
                    onFocus={(e) => e.target.style.boxShadow = styles.inputFocus.boxShadow}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
                <input
                    type="text"
                    name="gfg"
                    value={usernames.gfg}
                    onChange={handleChange}
                    placeholder="GeeksforGeeks Username"
                    style={styles.input}
                    onFocus={(e) => e.target.style.boxShadow = styles.inputFocus.boxShadow}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
                <button
                    type="submit"
                    style={styles.button}
                    onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                >
                    Go to Dashboard
                </button>
            </form>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#e8f6f3', // Light teal background for a fresh look
        padding: '0 20px',
    },
    form: {
        backgroundColor: '#ffffff',
        padding: '30px 40px',
        borderRadius: '10px',
        boxShadow: '0 12px 25px rgba(0, 0, 0, 0.15)',
        maxWidth: '420px',
        width: '100%',
        textAlign: 'center',
    },
    heading: {
        margin: '0 0 15px',
        fontSize: '26px',
        color: '#1a535c', // Dark teal
        fontWeight: 'bold',
    },
    description: {
        margin: '0 0 25px',
        fontSize: '15px',
        color: '#4a4a4a', // Slightly darker gray for better readability
    },
    input: {
        width: '100%',
        padding: '12px 15px',
        margin: '8px 0',
        borderRadius: '6px',
        border: '1px solid #c4c4c4',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 0 0 transparent',
    },
    inputFocus: {
        boxShadow: '0 0 8px rgba(26, 83, 92, 0.4)' // Soft teal glow on focus
    },
    button: {
        padding: '12px 0',
        backgroundColor: '#1a535c', // Dark teal for button
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '17px',
        fontWeight: 'bold',
        width: '100%',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        marginTop: '20px',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
    },
    buttonHover: {
        backgroundColor: '#174d55', // Slightly darker shade on hover
    },
};

export default UsernameForm;
