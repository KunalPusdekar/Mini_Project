// components/ContestCard.jsx
import React from 'react';

const ContestCard = ({ contest }) => {
    return (
        <div style={styles.cardContainer}>
            <h2 style={styles.platform}>{contest.platform}</h2>
            <h3 style={styles.name}>{contest.name}</h3>
            <p style={styles.dateTime}>
                <strong>Date:</strong> {contest.date} | <strong>Time:</strong> {contest.time}
            </p>
            <p style={styles.details}>{contest.details}</p>
        </div>
    );
};

const styles = {
    cardContainer: {
        padding: '20px',
        margin: '10px 0',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    platform: {
        fontSize: '18px',
        color: '#0070f3',
    },
    name: {
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '10px 0',
    },
    dateTime: {
        fontSize: '16px',
        color: '#666',
        margin: '5px 0',
    },
    details: {
        fontSize: '15px',
        color: '#333',
        marginTop: '10px',
    },
};

export default ContestCard;
