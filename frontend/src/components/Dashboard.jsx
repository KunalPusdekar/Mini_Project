import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Heatmap from './Heatmap'; // Import the Heatmap component

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Retrieve usernames from local storage
        const storedUsernames = JSON.parse(localStorage.getItem('usernames')) || {};
        const {
            leetCode: leetcodeUsername = '',
            codeChef: codechefUsername = '',
            codeForces: codeforcesUsername = '',
            gfg: gfgUsername = ''
        } = storedUsernames;

        // Fetch data from backend using retrieved usernames
        axios.post('http://localhost:3000/users/combinedData', {
            leetcodeUsername,
            codechefUsername,
            codeforcesUsername,
            gfgUsername,
        })
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    // Wait for data to load
    if (!data) return <div>Loading...</div>;

    // Style definitions
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
     
        // backgroundColor: '#F3F4F6',
    };

    const mainContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '80%',
        maxWidth: '1200px',
        marginTop: '20px',
    };

    const profileSectionStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginRight: '20px',
        border: '3px solid #808080',
        
    };

    const statsSectionStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginLeft: '20px',
        border: '3px solid #808080',
    };

    const chartStyle = {
        width: '100%',
        height: '300px',
        marginBottom: '20px',
    };

    const bottomSectionStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 10px',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '50px',
        border: '3px solid #808080',
        width:'78%',
    };

    const activityStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        marginRight: '10px',
    };

    const heatmapStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        marginLeft: '10px',
    };

    const cardStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '10px 10px',
        marginBottom: '10px',
        backgroundColor: '#E5E7EB',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    // Prepare pie and bar data from fetched API response
    const pieData = {
        labels: ['LeetCode', 'Codeforces', 'GFG', 'CodeChef'],
        datasets: [
            {
                data: [
                    data.platformData.leetcode.totalSolved,
                    data.platformData.codeforces.data.totalSolved,
                    data.platformData.gfg.TotalSolve,
                    data.platformData.codechef.totalSolved,
                ],
                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
            },
        ],
    };

    const barData = {
        labels: ['Easy', 'Medium', 'Hard'],
        datasets: [
            {
                label: 'Difficulty Breakdown',
                data: [
                    data.difficultyBreakdown.easy,
                    data.difficultyBreakdown.medium,
                    data.difficultyBreakdown.hard,
                ],
                backgroundColor: '#6366F1',
                borderRadius: 4,
                barThickness: 30,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 45,
                },
            },
            y: {
                grid: {
                    color: '#E5E7EB',
                },
                beginAtZero: true,
            },
        },
    };

    // Prepare the recent submissions list
    const recentSubmissions = data.platformData.leetcode.recentSubmissions || [];

    // Prepare data for display
    const leetcodeTotalSolved = data.platformData.leetcode.totalSolved;
    const gfgTotalSolved = data.platformData.gfg.TotalSolve;
    const codeforcesTotalSolved = data.platformData.codeforces.data.totalSolved;
    const codechefTotalSolved = data.platformData.codechef.totalSolved;

    return (
        <div style={containerStyle}>
            <h1>User Dashboard</h1>
            <div style={mainContainerStyle}>
                <div style={profileSectionStyle}>
                    <h2>User Details</h2>
                    <p><strong>Total Questions Solved:</strong> {data.totalQuestionsSolved}</p>
                    <p><strong>Total Active Days:</strong> {data.totalActiveDays}</p>
                    <br />
                    <p><strong>Total Questions Solved (LeetCode):</strong> {leetcodeTotalSolved}</p>
                    <p><strong>Total Questions Solved (GFG):</strong> {gfgTotalSolved}</p>
                    <p><strong>Total Questions Solved (Codeforces):</strong> {codeforcesTotalSolved}</p>
                    <p><strong>Total Questions Solved (CodeChef):</strong> {codechefTotalSolved}</p>
                </div>
                <div style={statsSectionStyle}>
                    <h2>Statistics</h2>
                    <Pie data={pieData} style={chartStyle} />
                    <Bar data={barData} options={barOptions} style={chartStyle} />
                </div>
            </div>
            <div style={bottomSectionStyle}>
                <div style={activityStyle}>
                    <h2>Recent Submissions</h2>
                    {recentSubmissions.length > 0 ? (
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {recentSubmissions.slice(0, 5).map((submission, index) => (
                                <li key={index} style={cardStyle}>
                                    <div>
                                        <strong>{submission.title}</strong>
                                        <br />
                                        Status: {submission.statusDisplay}
                                    </div>
                                    <div>Language: {submission.lang}</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No recent submissions available.</p>
                    )}
                </div>
                <div style={heatmapStyle}>
                    <h2>Activity Heatmap</h2>
                    <Heatmap activityHeatmap={data.activityHeatmap} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
