const axios = require('axios');

// Helper function to calculate the number of contests in CodeChef
const calculateCodeChefContests = (ratingData) => {
    if (Array.isArray(ratingData)) {
        return ratingData.length;
    }
    return 0;
};

// Helper function to get CodeChef heatmap data in the desired format
const getCodeChefHeatmap = (codechefData) => {
    const heatmap = {};
    if (Array.isArray(codechefData.heatMap)) {
        codechefData.heatMap.forEach(entry => {
            const timestamp = Math.floor(new Date(entry.date).getTime() / 1000);
            heatmap[timestamp] = entry.value;
        });
    }
    return heatmap;
};

// Helper function to get LeetCode heatmap data in the desired format
const getLeetCodeHeatmap = (leetcodeData) => {
    const heatmap = {};
    if (leetcodeData && leetcodeData.submissionCalendar) {
        for (const timestamp in leetcodeData.submissionCalendar) {
            if (leetcodeData.submissionCalendar.hasOwnProperty(timestamp)) {
                heatmap[timestamp] = leetcodeData.submissionCalendar[timestamp];
            }
        }
    } else {
        console.warn('LeetCode submissionCalendar is undefined or missing.');
    }
    return heatmap;
};

// Function to combine heatmaps
const combineHeatmaps = (leetcodeHeatmap, codechefHeatmap) => {
    const combinedHeatmap = { ...leetcodeHeatmap };
    for (const [timestamp, value] of Object.entries(codechefHeatmap)) {
        combinedHeatmap[timestamp] = (combinedHeatmap[timestamp] || 0) + value;
    }
    return combinedHeatmap;
};

const combineUserData = async (req, res) => {
    const { codechefUsername, codeforcesUsername, gfgUsername, leetcodeUsername } = req.body;

    try {
        // Define an array to hold the results of API calls
        const fetchPromises = [];

        // Push API fetch promises only if usernames are provided
        if (codechefUsername) {
            fetchPromises.push(
                axios.get(`http://localhost:3000/codechef/${codechefUsername}`).catch(err => {
                    console.warn('Failed to fetch CodeChef data:', err.message);
                    return { data: {} }; // Return an empty object on error
                })
            );
        } else {
            fetchPromises.push(Promise.resolve({ data: {} }));
        }

        if (codeforcesUsername) {
            fetchPromises.push(
                axios.get(`http://localhost:3000/codeforces/${codeforcesUsername}`).catch(err => {
                    console.warn('Failed to fetch Codeforces data:', err.message);
                    return { data: {} };
                })
            );
        } else {
            fetchPromises.push(Promise.resolve({ data: {} }));
        }

        if (gfgUsername) {
            fetchPromises.push(
                axios.get(`http://localhost:3000/gfg/${gfgUsername}`).catch(err => {
                    console.warn('Failed to fetch GFG data:', err.message);
                    return { data: {} };
                })
            );
        } else {
            fetchPromises.push(Promise.resolve({ data: {} }));
        }

        if (leetcodeUsername) {
            fetchPromises.push(
                axios.get(`http://localhost:3000/leetcode/${leetcodeUsername}`).catch(err => {
                    console.warn('Failed to fetch LeetCode data:', err.message);
                    return { data: {} };
                })
            );
        } else {
            fetchPromises.push(Promise.resolve({ data: {} }));
        }

        // Wait for all API requests to complete
        const [codechefData, codeforcesData, gfgData, leetcodeData] = await Promise.all(fetchPromises);

        // Combine the data
        const totalQuestionsSolved = (leetcodeData.data.totalSolved || 0) +
                                      (codechefData.data.easySolved || 0) +
                                      (gfgData.data.TotalSolve || 0) +
                                      (codeforcesData.data.totalSolved || 0);

        const totalActiveDays = Math.max(
            leetcodeData.data.totalActiveDays || 0,
            codechefData.data.activeDays || 0,
            gfgData.data.Consistency ? parseInt(gfgData.data.Consistency.split(' /')[0], 10) : 0,
            codeforcesData.data.activeDays || 0
        );

        const totalContests = {
            leetcode: leetcodeData.data.totalContests || 0,
            codechef: calculateCodeChefContests(codechefData.data.ratingData),
            gfg: gfgData.data.TotalContests || 0,
            codeforces: codeforcesData.data.totalContests || 0,
        };

        const difficultyBreakdown = {
            easy: (leetcodeData.data.easySolved || 0) + (codechefData.data.easySolved || 0) + (gfgData.data.TotalEasy || 0) + (codeforcesData.data.easySolved || 0),
            medium: (leetcodeData.data.mediumSolved || 0) + (codechefData.data.mediumSolved || 0) + (gfgData.data.TotalMedium || 0) + (codeforcesData.data.mediumSolved || 0),
            hard: (leetcodeData.data.hardSolved || 0) + (codechefData.data.hardSolved || 0) + (gfgData.data.TotalHard || 0) + (codeforcesData.data.hardSolved || 0),
        };

        const ratingGraph = {
            leetcode: leetcodeData.data.ratingGraph || {},
            codechef: codechefData.data.ratingData || {},
            codeforces: codeforcesData.data.ratingGraph || {},
        };

        // Extract and combine heatmaps
        const leetcodeHeatmap = getLeetCodeHeatmap(leetcodeData.data);
        const codechefHeatmap = getCodeChefHeatmap(codechefData.data);
        const combinedHeatmap = combineHeatmaps(leetcodeHeatmap, codechefHeatmap);

        const platformData = {
            leetcode: leetcodeData.data,
            codechef: codechefData.data,
            gfg: gfgData.data,
            codeforces: codeforcesData.data,
        };

        const combinedData = {
            totalQuestionsSolved,
            totalActiveDays,
            totalContests,
            difficultyBreakdown,
            ratingGraph,
            activityHeatmap: combinedHeatmap,
            platformData,
        };

        res.json(combinedData);
    } catch (error) {
        console.error('Error combining user data:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch combined user data' });
    }
};

module.exports = combineUserData;
