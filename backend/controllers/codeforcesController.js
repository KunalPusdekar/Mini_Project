// controllers/codeforcesController.js

const axios = require('axios');

// Function to get Codeforces data
const getCodeforcesData = async (username) => {
    try {
        // Fetch user info from Codeforces API
        const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
        const userInfo = response.data.result[0];

        // Fetch user submissions
        const submissionsResponse = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
        const submissions = submissionsResponse.data.result;

        // Process submissions to get stats
        const totalSolved = submissions.filter(sub => sub.verdict === 'OK').length;
        const totalSubmissions = submissions.length;

        // Categorize submissions by difficulty (if available)
        const difficultyStats = {
            easy: submissions.filter(sub => sub.problem && sub.problem.rating === 800).length,
            medium: submissions.filter(sub => sub.problem && sub.problem.rating === 1600).length,
            hard: submissions.filter(sub => sub.problem && sub.problem.rating === 2400).length,
        };

        // Return aggregated data
        return {
            username: userInfo.handle,
            totalSolved,
            totalSubmissions,
            easySolved: difficultyStats.easy,
            mediumSolved: difficultyStats.medium,
            hardSolved: difficultyStats.hard,
            ranking: userInfo.rank,
            contributionPoints: userInfo.contribution,
            reputation: userInfo.rating,
        };
    } catch (error) {
        console.error('Error fetching Codeforces data:', error.response ? error.response.data : error.message);
        return { error: 'Failed to fetch Codeforces data' };
    }
};

// Controller function for handling requests
const codeforcesController = async (req, res) => {
    const { username } = req.params;
    const codeforcesData = await getCodeforcesData(username);
    
    if (codeforcesData.error) {
        res.status(404).json({ status: "error", message: codeforcesData.error });
    } else {
        res.json({ status: "success", data: codeforcesData });
    }
};

module.exports = codeforcesController;
