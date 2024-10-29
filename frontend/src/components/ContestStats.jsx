// src/components/ContestStats.js
const ContestStats = ({ platformData }) => {
    return (
        <div className="contest-stats">
            <h2>Contest Stats</h2>
            {Object.keys(platformData).map(platform => (
                <div key={platform}>
                    <h3>{platform.charAt(0).toUpperCase() + platform.slice(1)}</h3>
                    <p>Total Solved: {platformData[platform].totalSolved || 0}</p>
                    <p>Ranking: {platformData[platform].ranking || 'N/A'}</p>
                </div>
            ))}
        </div>
    );
};

export default ContestStats;
