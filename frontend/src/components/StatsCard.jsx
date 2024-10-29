// StatsCard.js
import React from 'react';

const StatsCard = ({ title, value }) => {
    return (
        <div style={styles.card}>
            <h3>{title}</h3>
            <p style={styles.value}>{value}</p>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    value: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#2d2d2d',
    }
};

export default StatsCard;
