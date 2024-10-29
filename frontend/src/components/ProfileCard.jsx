// ProfileCard.js
import React from 'react';

const ProfileCard = () => {
    return (
        <div style={styles.card}>
            <h3>UserName</h3>
            <button style={styles.button}>Edit Profile</button>
            <ul style={styles.infoList}>
                <li>Location</li>
                <li>Institution</li>
                <li>Mail ID</li>
                <li>LinkedIn</li>
                <li>Twitter</li>
                <li>GitHub</li>
                <li>Instagram</li>
            </ul>
        </div>
    );
};

const styles = {
    card: {
        gridArea: 'profile',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    button: {
        backgroundColor: '#a6d3ff',
        color: '#333',
        padding: '8px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        marginBottom: '20px'
    },
    infoList: {
        listStyleType: 'none',
        padding: 0,
        lineHeight: '1.8',
    }
};

export default ProfileCard;
