// pages/ContestSchedulePage.jsx

import React, { useEffect, useState } from 'react';
import mockContests from '../../data/mockContests';
import ContestCard from '../components/ContestCard';

const ContestSchedulePage = () => {
    const [contests, setContests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setContests(mockContests);
    }, []);

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.title}>Upcoming Coding Contests</h1>
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.contestList}>
                {contests.map((contest) => (
                    <ContestCard key={contest.id} contest={contest} />
                ))}
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        padding: '40px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    title: {
        fontSize: '30px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '30px',
        color: '#333',
    },
    contestList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        padding: '0 20px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '20px',
    },
};

export default ContestSchedulePage;
