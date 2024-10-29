// ContestsCard.js
import React from 'react';

const ContestsCard = () => {
    return (
        <div style={styles.card}>
            <h3>Total Contests</h3>
            <p style={styles.value}>25</p>
            <div style={styles.platformStats}>
                <p>CodeChef: <strong>24</strong></p>
                <p>LeetCode: <strong>1</strong></p>
            </div>
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
    },
    platformStats: {
        marginTop: '10px',
        fontSize: '14px',
        color: '#333',
    }
};

export default ContestsCard;
