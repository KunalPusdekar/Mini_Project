// RatingGraph.js
import React from 'react';

const RatingGraph = () => {
    return (
        <div style={styles.card}>
            <h3>Rating Graph</h3>
            {/* Placeholder for graph */}
            <div style={styles.graphPlaceholder}></div>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    graphPlaceholder: {
        width: '100%',
        height: '100px',
        backgroundColor: '#f0f0f0',
        borderRadius: '6px',
    }
};

export default RatingGraph;
